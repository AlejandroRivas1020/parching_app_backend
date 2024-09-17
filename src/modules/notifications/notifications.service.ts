import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../user/entities/user.entity';
import { Event } from '../event/entities/event.entity';
import { InjectQueue, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import {
  getEventReminderTemplate,
  getEventUpdateTemplate,
  getWelcomeEmailTemplate, // Template de correo de bienvenida
  getVerificationEmailTemplate,
  getNotificationEmailTemplate, // Template de correo de verificación
} from './notifications.template'; // Importar todos los templates necesarios
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as nodemailer from 'nodemailer';
import * as dayjs from 'dayjs'; // Importar dayjs para el cálculo del día antes del evento

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectQueue('notification') private readonly notificationQueue: Queue, // Integramos la cola de Bull
  ) {
    // Configuración de Nodemailer para enviar correos
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      secure: false, // Sin SSL/TLS debo recordar esto
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Crear una nueva notificación en la plataforma y agregarla a la cola de Bull
  async createPlatformNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const user = await this.userRepository.findOne({
      where: { id: createNotificationDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user,
      isRead: createNotificationDto.isRead ?? false, // la dejo como no leída por defecto
    });

    // se guarda la notificación en la base de datos
    const savedNotification =
      await this.notificationRepository.save(notification);

    // se agrega la notificación a la cola para ser procesada asíncronamente
    await this.notificationQueue.add('send-notification', {
      userId: savedNotification.user.id,
      title: savedNotification.title,
      message: savedNotification.message,
    });

    return savedNotification;
  }

  // Enviar notificación de actualización de evento (agregar a la cola)
  async sendEventUpdateNotification(
    eventId: string,
    message: string,
  ): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['host'],
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const subject = `Update on ${event.information.title}`;
    const htmlContent = getEventUpdateTemplate(
      event.information.title,
      message,
    );
    const hostEmail = event.host.email;

    // Agregar envío de correo electrónico a la cola de Bull
    await this.notificationQueue.add('send-email', {
      to: hostEmail,
      subject,
      htmlContent,
    });

    // Crear notificación en la plataforma y agregarla a la cola
    await this.createPlatformNotification({
      userId: event.host.id,
      title: `Update on ${event.information.title}`,
      message,
      isRead: false,
    });
  }

  // Enviar un correo con la plantilla genérica
  async sendGenericNotification(
    to: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const htmlContent = getNotificationEmailTemplate(message);
    await this.sendEmail(to, subject, htmlContent);
  }

  // Enviar recordatorio de evento un día antes (agregar a la cola con delay)
  async sendEventReminder(eventId: string): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['host'],
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const subject = `Reminder: ${event.information.title} is coming up!`;
    const htmlContent = getEventReminderTemplate(
      event.information.title,
      event.startDate.toISOString(),
    );
    const hostEmail = event.host.email;

    // Calcular el tiempo hasta un día antes del evento
    const eventStartDate = dayjs(event.startDate);
    const reminderDate = eventStartDate.subtract(1, 'day');
    const delay = reminderDate.diff(dayjs(), 'milliseconds'); // Diferencia en milisegundos

    if (delay > 0) {
      // Agregar envío de recordatorio a la cola de Bull con un delay para enviarlo un día antes
      await this.notificationQueue.add(
        'send-email',
        {
          to: hostEmail,
          subject,
          htmlContent,
        },
        {
          delay, // Se ejecutará en la fecha y hora especificada
        },
      );

      // También agregamos la notificación en la plataforma con el mismo delay
      await this.notificationQueue.add(
        'send-notification',
        {
          userId: event.host.id,
          title: `Reminder: ${event.information.title}`,
          message: `Your event starts on ${event.startDate.toISOString()}.`,
          isRead: false,
        },
        {
          delay, // Se ejecutará en la fecha y hora especificada
        },
      );
    } else {
      console.warn(
        `Event reminder for ${eventId} is in the past or too close to be scheduled.`,
      );
    }
  }

  // Procesar la cola para enviar correos electrónicos
  @Process('send-email')
  async handleSendEmail(job: Job) {
    const { to, subject, htmlContent } = job.data;
    await this.sendEmail(to, subject, htmlContent);
  }

  // Método para enviar un correo electrónico
  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }

  // Procesar la cola para enviar notificaciones en la plataforma
  @Process('send-notification')
  async handleSendNotification(job: Job) {
    const { userId, title, message } = job.data;
    await this.createPlatformNotification({
      userId,
      title,
      message,
      isRead: false,
    });
  }

  // Método para enviar correo de bienvenida
  async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    const subject = 'Welcome to Our Platform!';
    const htmlContent = getWelcomeEmailTemplate(userName); // Utilizando el template de bienvenida

    await this.sendEmail(email, subject, htmlContent);
  }

  // Método para enviar correo de verificación
  async sendVerificationEmail(
    email: string,
    userId: string,
    verificationToken: string,
  ): Promise<void> {
    const subject = 'Verify Your Email';
    const htmlContent = getVerificationEmailTemplate(verificationToken, userId); // Utilizando el template de verificación

    await this.sendEmail(email, subject, htmlContent);
  }

  // Obtener notificaciones de un usuario
  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  // Marcar una notificación como leída
  async markAsRead(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = true;
    await this.notificationRepository.save(notification);
  }
}
