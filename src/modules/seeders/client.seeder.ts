import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientSeeder {
  private readonly logger = new Logger(ClientSeeder.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    // Busco el role de client por el nombre
    const clientRole = await this.roleRepository.findOne({
      where: { name: 'client' },
    });
    if (!clientRole) {
      throw new Error('Role client not found. Please seed roles first.');
    }

    const clientUser = await this.userRepository.findOne({
      where: { email: 'client@testapp.com' },
    });
    if (!clientUser) {
      const passwordHash = await bcrypt.hash('client123', 10);

      const newclient = this.userRepository.create({
        name: 'client User',
        email: 'client@testapp.com',
        password: passwordHash,
        profilePicture:
          'https://res.cloudinary.com/djsxw9zeu/image/upload/v1726387092/uploads/ii1aj8mocqb2mrcryif8.jpg',
        roleId: clientRole.id,
      });

      await this.userRepository.save(newclient);
      this.logger.log('Client user created successfully.');
    } else {
      this.logger.log('Client user already exists.');
    }
  }
}
