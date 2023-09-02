import { User } from "../../entities/user";
import { IBaseRepository } from "./base-repository";

export interface IUserRepository extends IBaseRepository<User> {
  findByTelegramToken(telegramToken: string): Promise<User | null>;
  findByVerifyCode(verifyCode: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  confirmAccount(id: string): Promise<User | null>;
  saveChatId(id: string, chatId: number): Promise<User | null>;
}
