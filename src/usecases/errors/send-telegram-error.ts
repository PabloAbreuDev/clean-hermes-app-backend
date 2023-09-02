import { UsecaseError } from "./usecase-error";

export class SendTelegramError extends Error implements UsecaseError {
  constructor() {
    super("Send telegram error.");
    this.name = "SendTelegramError";
  }
}
