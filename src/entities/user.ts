export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  telegramToken: string;
  verified: boolean;
  verifyCode: string;
}
