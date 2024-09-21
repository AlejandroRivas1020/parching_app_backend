import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const handler = context.getHandler();

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      handler,
    );

    if (!requiredPermissions) {
      return true;
    }

    const userPermissions = await this.permissionService.findUserPermissions(
      user.id,
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.some(
        (userPermission) =>
          userPermission.path.pathname === permission && userPermission.canRead,
      ),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have the required permissions to access this resource',
      );
    }

    return true;
  }
}
