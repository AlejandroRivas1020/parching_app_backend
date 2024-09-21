import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User } from '../user/entities/user.entity'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyectar el repositorio de User
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: string): Promise<Permission> {
    return this.permissionRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    await this.permissionRepository.update(id, updatePermissionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.permissionRepository.delete(id);
  }

  async findUserPermissions(userId: string): Promise<Permission[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'], // Asegúrate de que se carga el rol
    });

    if (!user || !user.role) {
      return []; // O lanzar un error si lo prefieres
    }

    return this.permissionRepository.find({
      where: { roleId: user.role.id },
      relations: ['path'],
    });
  }
}
