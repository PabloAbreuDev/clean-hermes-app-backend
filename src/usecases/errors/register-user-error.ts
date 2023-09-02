import { UsecaseError } from "./usecase-error";

export class RegisterUserError extends Error implements UsecaseError {
  constructor() {
    super("Register user error.");
    this.name = "RegisterUserError";
  }
}
