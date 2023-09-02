import { body } from "express-validator";

export const sendNotificationValidation = [
  body("name", "name is required").exists(),
];
