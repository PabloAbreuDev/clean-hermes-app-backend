import { Notification } from "../domain/entities/notification";
import {
  ISendNotification,
  SendNotificationDto,
} from "../domain/usecases/send-notification";
import { CreateNotificationError } from "./errors/create-notification";
import { InvalidChatIdError } from "./errors/invalid-chat-id";
import { SendMailError } from "./errors/send-mail-error";
import { SendTelegramError } from "./errors/send-telegram-error";
import { UserNotFoundError } from "./errors/user-not-found";
import { ILogger } from "./protocols/logger/logger";
import { IEmailService } from "./protocols/messageria/email-service";
import { ITelegramService } from "./protocols/messageria/telegram-service";
import { INotificationRepository } from "./protocols/repositories/notification-repository";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class SendNotification implements ISendNotification {
  constructor(
    private readonly mailService: IEmailService,
    private readonly telegramService: ITelegramService,
    private readonly notificationRepository: INotificationRepository,
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger
  ) {}
  async execute(
    data: SendNotificationDto
  ): Promise<Notification | null | undefined> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (data.receiverType === "EMAIL") {
      if (
        !data.receiverEmailOptions ||
        !data.receiverEmailOptions.address ||
        !data.receiverEmailOptions.subject ||
        !data.receiverEmailOptions.text
      ) {
        throw new SendMailError();
      }
      try {
        await this.mailService.send({
          to: data.receiverEmailOptions.address,
          subject: data.receiverEmailOptions.subject,
          text: data.receiverEmailOptions.text,
        });
      } catch (err) {
        this.logger.error({ extraInfo: err });
        throw new SendMailError();
      }
    }

    if (data.receiverType === "TELEGRAM") {
      if (!user.telegramChatId) {
        throw new InvalidChatIdError();
      }
      try {
        await this.telegramService.send({
          to: user.telegramChatId,
          text: data.receiverTelegramOptions.text,
        });
      } catch (err) {
        this.logger.error({ extraInfo: err });
        throw new SendTelegramError();
      }
    }

    try {
      const notification = new Notification({
        description: data.notification.description,
        name: data.notification.name,
        userId: data.userId,
        additionalInfo: data.notification.additionalInfo,
      });
      return await this.notificationRepository.create(notification);
    } catch (err) {
      this.logger.error({ extraInfo: err });
      throw new CreateNotificationError();
    }
  }
}
