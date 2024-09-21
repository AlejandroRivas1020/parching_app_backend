import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { Permission } from './entities/permission.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Path, Permission, User])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
