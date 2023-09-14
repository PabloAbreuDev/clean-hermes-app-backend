import { ValidationChain, body } from "express-validator";

export const createCheckHealth: ValidationChain[] = [
  body("url", "url is required").exists(),
];
