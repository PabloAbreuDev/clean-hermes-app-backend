import { UserRepository } from "../../../infra/database/mongodb/repositories/user-repository";

export const mockUserRepository: jest.Mocked<UserRepository> = {
  findByVerifyCode: jest.fn(),
  confirmAccount: jest.fn(),
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findByTelegramToken: jest.fn(),
  saveChatId: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};
