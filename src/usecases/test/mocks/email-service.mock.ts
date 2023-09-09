import { IEmailService } from "../../protocols/messageria/email-service";

export const mockEmailService: jest.Mocked<IEmailService> = {
  send: jest.fn(),
};
