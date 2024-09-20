import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { EventModule } from './modules/event/event.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommonModule } from './common/common.module';
import { validationSchema } from './common/config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './common/config/db.config';
import { CategoryModule } from './modules/category/category.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { SeedersModule } from './modules/seeders/seeders.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    EventModule,
    CommentModule,
    CommonModule,
    CategoryModule,
    NotificationsModule,
    SeedersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: '.env',
      // validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
