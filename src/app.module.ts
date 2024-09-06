import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { EventModule } from './modules/event/event.module';
import { CommentModule } from './modules/comment/comment.module';
import { ImageModule } from './modules/image/image.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, UserModule, ClientModule, RoleModule, PermissionModule, EventModule, CommentModule, ImageModule, CommonModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
