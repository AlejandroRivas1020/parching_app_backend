import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Método para crear un usuario y su cliente asociado
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    const newClient = this.clientRepository.create({
      birthDate: createUserDto.birthDate,
      gender: createUserDto.gender,
      address: createUserDto.address,
      locationDescription: createUserDto.locationDescription,
      score: createUserDto.score,
      user: user,
    });

    // Guardar el cliente en la base de datos
    await this.clientRepository.save(newClient);

    // Retornar el usuario con la relación al cliente cargada
    return this.findOne(savedUser.id);
  }

  // Método para obtener todos los usuarios (con sus clientes)
  async findAll() {
    return this.userRepository.find({ relations: ['client'] });
  }

  // Método para obtener un usuario por ID (con su cliente)
  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!user) {
      throw new NotFoundException(`User is not found`);
    }
    return user;
  }

  // Método para actualizar un usuario por ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User is not found`);
    }

    return this.userRepository.save(user);
  }

  // Método para eliminar un usuario por ID
  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException(`User is not found`);
    }
  }

  // Nueva lógica para actualizar las preferencias de notificaciones
  async updateNotificationPreferences(
    userId: string,
    preferences: {
      emailNotifications: boolean;
      platformNotifications: boolean;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    user.emailNotifications = preferences.emailNotifications;
    user.platformNotifications = preferences.platformNotifications;

    return this.userRepository.save(user);
  }

  // Método para actualizar la foto de perfil de un usuario
  async updateUserProfilePicture(
    userId: string,
    file: Express.Multer.File,
  ): Promise<User> {
    // Buscar el usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    try {
      // Subir la nueva imagen a Cloudinary
      const result = await this.cloudinaryService.uploadImage(file);
      user.profilePicture = result.secure_url;
    } catch (Error) {
      throw new Error('Error uploading image to Cloudinary');
    }

    return this.userRepository.save(user);
  }
}
