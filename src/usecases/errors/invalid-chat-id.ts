import { UsecaseError } from "./usecase-error";

export class InvalidChatIdError extends Error implements UsecaseError {
  constructor() {
    super("Invalid chat id.");
    this.name = "InvalidChatIdError";
  }
}
