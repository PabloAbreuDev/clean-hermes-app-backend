import { randomUUID } from "crypto";

export class User {
  public name: string;
  public email: string;
  public password: string;
  public verifyCode: string;
  public telegramToken: string;
  public telegramChatId: number;
  public verified: boolean;

  constructor(props: {
    name: string;
    email: string;
    password: string;
    verifyCode?: string;
    telegramToken?: string;
    telegramChatId?: number;
    verified?: boolean;
  }) {
    if (!props.name || props.name.length < 3) {
      throw new Error("You must enter a valid name");
    }

    if (!props.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("You must enter a valid email");
    }

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.verifyCode = props.verifyCode ?? randomUUID();
    this.telegramToken = props.telegramToken ?? randomUUID();
    this.telegramChatId = props.telegramChatId ?? 0;
    this.verified = props.verified ?? false;
  }
}
