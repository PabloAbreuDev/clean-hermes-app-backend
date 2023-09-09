import { INotificationRepository } from "../../ports/repositories/notification-repository";

export const mockNotificationRepository: jest.Mocked<INotificationRepository> =
  {
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
