import { ITelegramService } from "../../protocols/messageria/telegram-service";

export const mockTelegramService: jest.Mocked<ITelegramService> = {
  send: jest.fn(),
};
