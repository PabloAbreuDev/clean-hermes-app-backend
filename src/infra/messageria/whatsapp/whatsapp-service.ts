import {
  IWhatsappService,
  WhatsappOptions,
} from "../../../interfaces/adapters/whatsapp-service";

export class WhatsappService implements IWhatsappService {
  async send(options: WhatsappOptions) {
    return await options;
  }
}
