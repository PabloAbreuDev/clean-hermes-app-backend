import { IEmailService } from "../../ports/adapters/email-service";

export const mockEmailService: jest.Mocked<IEmailService> = {
  send: jest.fn(),
};
