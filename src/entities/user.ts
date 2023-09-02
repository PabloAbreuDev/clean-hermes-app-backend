export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  telegramToken: string;
  telegramChatId: number;
  verified: boolean;
  verifyCode: string;
}
