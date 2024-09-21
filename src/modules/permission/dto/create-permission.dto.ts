import { IsString, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;
  @IsBoolean()
  canCreate: boolean;

  @IsBoolean()
  canRead: boolean;

  @IsBoolean()
  canUpdate: boolean;

  @IsBoolean()
  canDelete: boolean;

  @IsString()
  pathId: string;
}
