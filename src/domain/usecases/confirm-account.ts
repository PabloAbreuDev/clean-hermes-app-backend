import { User } from "../entities/user";

export interface ConfirmAccountDto {
  verifyCode: string;
}

export interface IConfirmAccount {
  execute(data: ConfirmAccountDto): Promise<User | null | undefined>;
}
