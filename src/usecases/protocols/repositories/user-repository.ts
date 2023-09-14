import { IBaseRepository, AlreadyExists } from "./index.ts";
import { User } from "../../../domain/entities/user";

export interface IUserRepository extends IBaseRepository<User> {
  findByTelegramToken(
    telegramToken: string
  ): Promise<AlreadyExists<User> | null>;
  findByVerifyCode(verifyCode: string): Promise<AlreadyExists<User> | null>;
  findByEmail(email: string): Promise<AlreadyExists<User> | null>;
  confirmAccount(id: string): Promise<AlreadyExists<User> | null>;
  saveChatId(id: string, chatId: number): Promise<AlreadyExists<User> | null>;
}
