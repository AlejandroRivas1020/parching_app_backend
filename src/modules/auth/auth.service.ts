import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { RegisterUserDto } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const {
      name,
      email,
      password,
      profilePicture,
      birthDate,
      gender,
      address,
      locationDescription,
    } = registerUserDto;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Buscar role por defecto cuando se registra con el nombre "user"
    const role = await this.roleRepository.findOne({ where: { name: 'user' } });

    // Crear el usuario
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
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
      userId: savedUser.id,
    });

    // Guardar el cliente en la base de datos
    await this.clientRepository.save(newClient);

    return savedUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
