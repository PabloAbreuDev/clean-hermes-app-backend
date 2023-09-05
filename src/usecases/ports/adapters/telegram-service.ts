export interface TelegramOptions {
	text: string;
}
export interface ITelegramService {
	send: (options: TelegramOptions) => Promise<TelegramOptions>;
}
