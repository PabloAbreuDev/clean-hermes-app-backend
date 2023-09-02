import { UsecaseError } from "./usecase-error";

export class UserAlreadyExistsError extends Error implements UsecaseError {
  constructor() {
    super("User already exists.");
    this.name = "UserAlreadyExists";
  }
}
