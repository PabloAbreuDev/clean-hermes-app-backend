import { NotificationRepository } from "../../infra/database/mongodb/repositories/notification-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { NodeMailerMailService } from "../../infra/messageria/mail/email-service";
import { TelegramService } from "../../infra/messageria/telegram/telegram-service";
import { WhatsappService } from "../../infra/messageria/whatsapp/whatsapp-service";

import { SendNotification } from "../../usecases/send-notification";

export const makeSendNotification = () => {
	const mailService = new NodeMailerMailService();
	const telegramService = new TelegramService();
	const whatsappService = new WhatsappService();
	const notificationRepository = new NotificationRepository();
	const userRepository = new UserRepository();
	const useCase = new SendNotification(
		mailService,
		telegramService,
		notificationRepository,
		userRepository
	);
	return useCase;
};
