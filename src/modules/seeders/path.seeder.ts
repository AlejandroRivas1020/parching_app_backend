// src/modules/path/path.seeder.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Path } from '../permission/entities/path.entity';
@Injectable()
export class PathSeeder {
  private readonly logger = new Logger(PathSeeder.name);

  constructor(
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
  ) {}

  async seed() {
    const paths = [
      { pathname: '/api/auth/register' },
      { pathname: '/api/auth/login' },
      { pathname: '/api/auth/verify-email' },
      { pathname: '/api/notifications' },
      { pathname: '/api/notifications/send-event-update/{eventId}' },
      { pathname: '/api/notifications/send-event-reminder/{eventId}' },
      { pathname: '/api/notifications/{userId}' },
      { pathname: '/api/notifications/{notificationId}/read' },
      { pathname: '/api/notifications/send-welcome-email' },
      { pathname: '/api/notifications/send-verification-email' },
      { pathname: '/api/user' },
      { pathname: '/api/user/{id}' },
      { pathname: '/api/user/{id}/notification-preferences' },
      { pathname: '/api/upload/image' },
      { pathname: '/api/roles' },
      { pathname: '/api/roles/{id}' },
      { pathname: '/api/roles/{id}/update' },
      { pathname: '/api/permission' },
      { pathname: '/api/permission/{id}' },
      { pathname: '/api/permission/{id}/update' },
      { pathname: '/api/permission/{id}/delete' },
      { pathname: '/api/events' },
      { pathname: '/api/events/{id}' },
      { pathname: '/api/events/{id}/update' },
      { pathname: '/api/events/{id}/delete' },
      { pathname: '/api/categories' },
      { pathname: '/api/categories/{id}' },
      { pathname: '/api/categories/form-template' },
      { pathname: '/api/categories/{id}/update' },
    ];

    for (const path of paths) {
      const exists = await this.pathRepository.findOne({
        where: { pathname: path.pathname },
      });
      if (!exists) {
        const newPath = this.pathRepository.create(path);
        await this.pathRepository.save(newPath);
        this.logger.log(`Path '${path.pathname}' has been added.`);
      } else {
        this.logger.log(`Path '${path.pathname}' already exists.`);
      }
    }
  }
}
