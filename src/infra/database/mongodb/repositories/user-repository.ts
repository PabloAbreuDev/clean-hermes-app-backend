import { User } from "../../../../domain/entities/user";
import { WithId } from "../../../../usecases/protocols/repositories/index.ts";
import { IUserRepository } from "../../../../usecases/protocols/repositories/user-repository";
import UserModel from "../models/user";

export class UserRepository implements IUserRepository {
  async create(data: Partial<User>): Promise<WithId<User> | null> {
    const obj = await UserModel.create(data);
    return { ...obj.toJSON(), id: obj.id };
  }
  async findById(id: string): Promise<WithId<User> | null> {
    return await UserModel.findById(id);
  }
  async findByVerifyCode(verifyCode: string): Promise<WithId<User> | null> {
    return await UserModel.findOne({ verifyCode });
  }
  async confirmAccount(id: string): Promise<WithId<User> | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: id },
      { verified: true, verifyCode: "" },
      { new: true }
    );
  }
  async findByEmail(email: string): Promise<WithId<User> | null> {
    return await UserModel.findOne({ email });
  }

  async findByTelegramToken(
    telegramToken: string
  ): Promise<WithId<User> | null> {
    return await UserModel.findOne({ telegramToken });
  }

  async saveChatId(id: string, chatId: number): Promise<WithId<User> | null> {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { telegramChatId: chatId }
    );
  }

  async find(data: Partial<User>): Promise<WithId<User>[] | null> {
    return await UserModel.find(data);
  }
  async findOne(data: Partial<User>): Promise<WithId<User> | null> {
    return await UserModel.findOne(data);
  }
}
