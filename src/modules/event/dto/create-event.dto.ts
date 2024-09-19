import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'Start date or time of the event',
    example: '2024-12-01T14:00:00',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @ApiProperty({
    description: 'End date or time of the event',
    example: '2024-12-01T16:00:00',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @ApiProperty({
    description: 'Maximum number of people that the event allows',
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Place where the event is taking place',
    example: 'Cr 31 No. 32-75, C.P 68001 Bucaramanga',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Filled form of the respective category',
    example: {
      name: 'hello world',
      email: 'hello.world@gmail.com',
      location: 'Cr 31 No. 32-75, C.P 68001 Bucaramanga',
    },
  })
  @IsNotEmpty()
  @IsObject()
  information: Record<string, any>;

  @ApiProperty({
    description: 'Array of categories ids (allows only one to be sent)',
    example: [
      '76e75588-1462-4b3a-b0e4-be6d0d1983e3',
      '5ba0d592-1b18-4831-b63b-800f6659978b',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categories: string[];

  @ApiProperty({
    description: 'User who is making the request is an admin?',
    example: true,
  })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description:
      'Id of the host of the event if an admin is creating an event for another user',
    example: '93febb35-5fb9-4710-b048-d57a51713644',
  })
  @IsNotEmpty()
  @IsUUID()
  host?: string;

  @ApiProperty({
    description: 'Urls of event images',
    type: [String],
    minItems: 1,
    maxItems: 5,
    example: ['http://cats.jpg', 'http://hello-world.jpg'],
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
}
