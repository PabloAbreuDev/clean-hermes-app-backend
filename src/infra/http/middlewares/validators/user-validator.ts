import { body } from "express-validator";

export const registerUserValidation = [
  body("name", "name is required").exists(),
];
