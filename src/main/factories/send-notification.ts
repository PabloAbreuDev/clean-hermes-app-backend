import { NotificationRepository } from "../../infra/database/mongodb/repositories/notification-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { NodeMailerMailService } from "../../infra/messageria/mail/email-service";
import { TelegramService } from "../../infra/messageria/telegram/telegram-service";
import { SendNotificationController } from "../../presentation/controllers/notification/send-notification.controller";
import { Controller } from "../../presentation/protocols/http";
import { SendNotification } from "../../usecases/send-notification";

export const makeSendNotification = (): Controller => {
  const mailService = new NodeMailerMailService();
  const telegramService = new TelegramService();
  const notificationRepository = new NotificationRepository();
  const userRepository = new UserRepository();

  const sendNotification = new SendNotification(
    mailService,
    telegramService,
    notificationRepository,
    userRepository
  );
  const sendNotificationController = new SendNotificationController(
    sendNotification
  );
  return sendNotificationController;
};
