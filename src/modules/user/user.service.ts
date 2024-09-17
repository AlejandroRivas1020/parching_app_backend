import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User is not found`);
    }
    return user;
  }

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
