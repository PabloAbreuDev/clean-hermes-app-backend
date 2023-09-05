import { randomUUID } from "crypto";
import { User } from "../entities/user";
import { RegisterUserError } from "./errors/register-user-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { IEmailService } from "./ports/adapters/email-service";
import { confirmAccountTemplate } from "../utils/templates/email/confirm-account";
import { hashPassword } from "../utils/bcrypt";
import { IUserRepository } from "./ports/repositories/user-repository";

export interface RegisterUserDto {
	name: string;
	email: string;
	password: string;
}

interface IRegisterUser {
	execute(data: RegisterUserDto): Promise<User | null>;
}

export class RegisterUser implements IRegisterUser {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly mailService: IEmailService
	) {}
	async execute(data: RegisterUserDto): Promise<User | null> {
		const userAlreadyExists = await this.userRepository.findByEmail(data.email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		try {
			let verifyCode = randomUUID();
			const user = await this.userRepository.create({
				...data,
				password: await hashPassword(data.password, 10),
				telegramToken: randomUUID(),
				verifyCode,
				verified: false,
			});
			this.mailService.send({
				to: data.email,
				subject: "Welcome to hermes app",
				text: confirmAccountTemplate(verifyCode),
				html: confirmAccountTemplate(verifyCode),
				attachments: [],
			});
			return user;
		} catch (err) {
			console.log(err);
			throw new RegisterUserError();
		}
	}
}
