
export interface WhatsappOptions {
	to: string,
	text: string
}

export interface IWhatsappService {
  send: (options: WhatsappOptions) => Promise<WhatsappOptions>;
}
