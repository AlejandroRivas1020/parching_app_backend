import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySeeder } from './category.seeder';
import { RoleSeeder } from './role.seeder';
import { AdminSeeder } from './admin.seeder'; // Importa el AdminSeeder
import { Category } from '../category/entities/category.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity'; // Importa la entidad de usuario
import { ClientSeeder } from './client.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Role, User])],
  providers: [CategorySeeder, RoleSeeder, AdminSeeder, ClientSeeder],
  exports: [CategorySeeder, RoleSeeder, AdminSeeder, ClientSeeder],
})
export class SeedersModule implements OnModuleInit {
  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly adminSeeder: AdminSeeder,
    private readonly clientSeeder: ClientSeeder,
  ) {}

  async onModuleInit() {
    console.log('Running seeders...');

    // Ejecutar los seeders
    await this.categorySeeder.seed();
    await this.roleSeeder.seed();
    await this.adminSeeder.seed();
    await this.clientSeeder.seed();

    console.log('Seeders completed.');
  }
}
