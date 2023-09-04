import { body } from "express-validator";

export const registerUserValidation = [
	body("name", "Name is required").exists(),
	body("email", "Invalid email address").isEmail(),
	body(
		"password",
		"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
	).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/),
];
