import { Notification } from "../../../entities/notification";
import { INotificationRepository } from "../../ports/repositories/notification-repository";

export const mockNotificationRepository: jest.Mocked<INotificationRepository> =
	{
		create: jest.fn(),
		findById: jest.fn(),
	};
