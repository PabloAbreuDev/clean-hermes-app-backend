import { UsecaseError } from "./usecase-error";

export class SendMailError extends Error implements UsecaseError {
  constructor() {
    super("Send mail error.");
    this.name = "SendMailError";
  }
}
