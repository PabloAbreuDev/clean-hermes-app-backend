import { UsecaseError } from "./usecase-error";

export class SaveChatIdError extends Error implements UsecaseError {
  constructor() {
    super("Error when save chat id.");
    this.name = "SaveChatIdError";
  }
}
