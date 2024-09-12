import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @Transform(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @Transform(() => Date)
  endDate: Date;

  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsObject()
  information: any;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categories: string[];

  @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsUUID()
  host: string;

  @IsOptional()
  @IsUUID()
  createdBy?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  images: string[];
}
