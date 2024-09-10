import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditableEntity } from './entities/auditable.entity';

@Module({ imports: [TypeOrmModule.forFeature([AuditableEntity])] })
export class CommonModule {}
