import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Client } from '../user/entities/client.entity';
import { RegisterUserDto } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';
import { Role } from '../role/entities/role.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { VerificationEmailsuccessfulTemplate } from '../notifications/notifications.template';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly defaultProfilePictureUrl =
    'http://res.cloudinary.com/djsxw9zeu/image/upload/v1726387092/uploads/ii1aj8mocqb2mrcryif8.jpg';

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private notificationService: NotificationsService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const {
      name,
      email,
      password,
      birthDate,
      gender,
      address,
      locationDescription,
    } = registerUserDto;

    // Verificar si ya existe un usuario con el mismo email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email is already registered.');
    }

    // Validar el nombre (solo letras y espacios)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      throw new UnauthorizedException(
        'Name must contain only letters and spaces.',
      );
    }

    // Validar la contraseña
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-.])[A-Za-z\d@$!%*?&+-.]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new UnauthorizedException(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&).',
      );
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Buscar role por defecto cuando se registra con el nombre "user"
    const role = await this.roleRepository.findOne({
      where: { name: 'client' },
    });
    if (!role) {
      throw new Error('Role "client" not found');
    }

    // Crear el usuario
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      profilePicture: this.defaultProfilePictureUrl,
      roleId: role.id,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await this.userRepository.save(newUser);

    // Crear el cliente asociado al usuario
    const newClient = this.clientRepository.create({
      birthDate,
      gender,
      address,
      locationDescription,
      score: 0, // Puntuación inicial
      user: savedUser,
    });

    // Guardar el cliente en la base de datos
    await this.clientRepository.save(newClient);

    const token = this.jwtService.sign(
      {
        id: savedUser.id,
      },
      { expiresIn: '10m' },
    );

    const verificationUrl = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;

    await this.notificationService.sendVerificationEmail(
      savedUser.email,
      verificationUrl,
    );

    return savedUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user.email_confirmed) {
      throw new UnauthorizedException('Email not verified.');
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async verifyEmailToken(token: string, @Res() res: Response): Promise<void> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      if (user.email_confirmed) {
        throw new UnauthorizedException('User is already active.');
      }

      // Marcar al usuario como activo
      user.email_confirmed = true;
      await this.userRepository.save(user);
      const htmlContent = VerificationEmailsuccessfulTemplate();

      await this.notificationService.sendWelcomeEmail(user.email, user.name);
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      throw new UnauthorizedException(
        error.name === 'TokenExpiredError'
          ? 'Token has expired.'
          : 'Invalid or expired token.',
      );
    }
  }
}
