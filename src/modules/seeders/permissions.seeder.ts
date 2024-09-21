import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../permission/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { Path } from '../permission/entities/path.entity';

@Injectable()
export class PermissionSeeder {
  private readonly logger = new Logger(PermissionSeeder.name);

  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
  ) {}

  async seed() {
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });
    const userRole = await this.roleRepository.findOne({
      where: { name: 'client' },
    });
    const paths = await this.pathRepository.find();

    for (const path of paths) {
      // Permisos para Admin en todas las rutas
      await this.permissionRepository.save({
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canRead: true,
        path: path,
        role: adminRole,
      });
      this.logger.log(
        `Permissions for '${path.pathname}' assigned to 'admin'.`,
      );

      // Permisos para Client solo en rutas específicas
      if (
        path.pathname === '/api/auth/register' ||
        path.pathname === '/api/auth/login' ||
        path.pathname === '/api/auth/verify-email' ||
        path.pathname === '/api/notifications/{userId}' ||
        path.pathname === '/api/notifications/{notificationId}/read' ||
        path.pathname === '/api/user' ||
        path.pathname === '/api/user/{id}' ||
        path.pathname === '/api/user/{id}/notification-preferences' ||
        path.pathname === '/api/events' ||
        path.pathname === '/api/events/{id}' ||
        path.pathname === '/api/categories' ||
        path.pathname === '/api/categories/{id}'
      ) {
        await this.permissionRepository.save({
          canCreate: true, // Permitir crear
          canUpdate: true, // Permitir actualizar
          canDelete: false, // No permitir eliminar
          canRead: true, // Permitir leer
          path: path,
          role: userRole,
        });
        this.logger.log(
          `Permissions for '${path.pathname}' assigned to 'client'.`,
        );
      }
    }
  }
}
