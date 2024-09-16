import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt'; // Para encriptar la contraseña

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    // Busco el role de administrador por el nmbre
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });
    if (!adminRole) {
      throw new Error('Role admin not found. Please seed roles first.');
    }

    const adminUser = await this.userRepository.findOne({
      where: { email: 'parchingapp@gmail.cpm' },
    });
    if (!adminUser) {
      const passwordHash = await bcrypt.hash('admin123', 10);

      const newUser = this.userRepository.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: passwordHash,
        profilePicture:
          'https://res.cloudinary.com/djsxw9zeu/image/upload/v1726387092/uploads/ii1aj8mocqb2mrcryif8.jpg',
        roleId: adminRole.id,
      });

      await this.userRepository.save(newUser);
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  }
}
