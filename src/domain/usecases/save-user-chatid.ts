import { User } from "../entities/user";

export interface SaveUserChatIdDto {
  telegramToken: string;
  chatId: number;
}

export interface ISaveUserChatId {
  execute(data: SaveUserChatIdDto): Promise<User | null | undefined>;
}
