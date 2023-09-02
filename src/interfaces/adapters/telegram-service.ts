export interface TelegramOptions {
	to: string,
	text: string
}
export interface ITelegramService {
  send: (options: TelegramOptions) => Promise<TelegramOptions>;
}
