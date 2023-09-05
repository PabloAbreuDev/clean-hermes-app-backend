import { ITelegramService } from "../../ports/adapters/telegram-service";

export const mockTelegramService: jest.Mocked<ITelegramService> = {
	send: jest.fn(),
};
