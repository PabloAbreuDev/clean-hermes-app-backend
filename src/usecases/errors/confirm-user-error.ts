import { UsecaseError } from "./usecase-error";

export class ConfirmUserError extends Error implements UsecaseError {
  constructor() {
    super("Error when confirm user.");
    this.name = "ConfirmUserError";
  }
}
