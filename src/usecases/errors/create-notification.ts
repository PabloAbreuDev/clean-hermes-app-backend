import { UsecaseError } from "./usecase-error";

export class CreateNotificationError extends Error implements UsecaseError {
  constructor() {
    super("Error creating notification");
    this.name = "CreateNotification";
  }
}
