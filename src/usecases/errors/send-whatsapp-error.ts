import { UsecaseError } from "./usecase-error";

export class SendWhatsappError extends Error implements UsecaseError {
  constructor() {
    super("Send whatsapp error.");
    this.name = "SendWhatsappError";
  }
}
