export interface TelegramOptions {
  to: number;
  text: string;
}
export interface ITelegramService {
  send: (options: TelegramOptions) => Promise<TelegramOptions>;
}
