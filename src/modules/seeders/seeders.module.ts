import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySeeder } from './category.seeder';
import { RoleSeeder } from './role.seeder';
import { AdminSeeder } from './admin.seeder'; // Importa el AdminSeeder
import { Category } from '../category/entities/category.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity'; // Importa la entidad de usuario
import { ClientSeeder } from './client.seeder';
import { PathSeeder } from './path.seeder';
import { PermissionSeeder } from './permissions.seeder';
import { Path } from '../permission/entities/path.entity';
import { Permission } from '../permission/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Role, User, Path, Permission])],
  providers: [
    CategorySeeder,
    RoleSeeder,
    AdminSeeder,
    ClientSeeder,
    PathSeeder,
    PermissionSeeder,
  ],
  exports: [
    CategorySeeder,
    RoleSeeder,
    AdminSeeder,
    ClientSeeder,
    PathSeeder,
    PermissionSeeder,
  ],
})
export class SeedersModule implements OnModuleInit {
  private readonly logger = new Logger(SeedersModule.name);

  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly adminSeeder: AdminSeeder,
    private readonly clientSeeder: ClientSeeder,
    private readonly pathSeeder: PathSeeder,
    private readonly permissionSeader: PermissionSeeder,
  ) {}

  async onModuleInit() {
    this.logger.log('Running seeders...');

    // Ejecutar los seeders
    await this.categorySeeder.seed();
    await this.roleSeeder.seed();
    await this.adminSeeder.seed();
    await this.clientSeeder.seed();
    await this.pathSeeder.seed();
    await this.permissionSeader.seed();

    this.logger.log('Seeders completed.');
  }
}
