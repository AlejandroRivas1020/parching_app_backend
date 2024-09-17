import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity'; // Ajusta la ruta según tu estructura

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const roles = [{ name: 'admin' }, { name: 'client' }];

    for (const role of roles) {
      const exists = await this.roleRepository.findOne({
        where: { name: role.name },
      });
      if (!exists) {
        const newRole = this.roleRepository.create(role);
        await this.roleRepository.save(newRole);
      }
    }
  }
}
