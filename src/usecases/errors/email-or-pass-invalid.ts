import { UsecaseError } from "./usecase-error";

export class EmailOrPasswordInvalidError extends Error implements UsecaseError {
  constructor() {
    super("Email or password invalid");
    this.name = "EmailOrPasswordInvalid";
  }
}
