import { Notification } from "../domain/entities/notification";
import {
  ISendNotification,
  SendNotificationDto,
} from "../domain/usecases/send-notification";
import Logger from "../utils/logger";
import { InvalidChatIdError } from "./errors/invalid-chat-id";
import { SendMailError } from "./errors/send-mail-error";
import { SendTelegramError } from "./errors/send-telegram-error";
import { UserNotFoundError } from "./errors/user-not-found";
import { IEmailService } from "./ports/adapters/email-service";
import { ITelegramService } from "./ports/adapters/telegram-service";
import { INotificationRepository } from "./ports/repositories/notification-repository";
import { IUserRepository } from "./ports/repositories/user-repository";

export class SendNotification implements ISendNotification {
  constructor(
    private readonly mailService: IEmailService,
    private readonly telegramService: ITelegramService,
    private readonly notificationRepository: INotificationRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(
    data: SendNotificationDto
  ): Promise<Notification | null | undefined> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (data.receiverType === "EMAIL") {
      try {
        await this.mailService.send({
          to: data.receiverEmailOptions.address,
          subject: data.receiverEmailOptions.subject,
          text: data.receiverEmailOptions.text,
        });
      } catch (err) {
        Logger.error(err);
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
        Logger.error(err);
        throw new SendTelegramError();
      }
    }

    try {
      return await this.notificationRepository.create(data.notification);
    } catch (err) {
      Logger.error(err);
      return;
    }
  }
}
