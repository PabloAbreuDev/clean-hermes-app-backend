import { RegisterUserError } from "../errors/register-user-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { RegisterUser, RegisterUserDto } from "../register-user";
import { mockEmailService } from "./mocks/email-service.mock";
import { mockUserRepository } from "./mocks/user-repository.mock";

describe("Register user", () => {
	it("Should register a user correctly", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null);
		jest.spyOn(mockEmailService, "send").mockResolvedValue();
		jest.spyOn(mockUserRepository, "create").mockResolvedValue({
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 123,
			telegramToken: "abcde",
			password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
		});

		const registerUserParams: RegisterUserDto = {
			email: "johndoe@email.com",
			name: "John Doe",
			password: "johndoe123",
		};

		const registerUser = new RegisterUser(mockUserRepository, mockEmailService);

		const sut = await registerUser.execute(registerUserParams);
		expect(sut).toBeTruthy();
		expect(sut).toMatchObject({
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 123,
			telegramToken: "abcde",
			password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm",
		});
		expect(mockEmailService.send).toHaveBeenCalledTimes(1);
		expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
		expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
			registerUserParams.email
		);
	});

	it("Should return an error if user already exists", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue({
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 123,
			telegramToken: "abcde",
			password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
		});
		const registerUser = new RegisterUser(mockUserRepository, mockEmailService);
		await expect(
			registerUser.execute({
				email: "johndoe@email.com",
				name: "John Doe",
				password: "12345",
			})
		).rejects.toThrow(new UserAlreadyExistsError());
	});

	it("Should return an error if something went wrong when trying to save user", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null);
		jest.spyOn(mockUserRepository, "create").mockRejectedValue(null);
		const registerUser = new RegisterUser(mockUserRepository, mockEmailService);
		await expect(
			registerUser.execute({
				email: "johndoe@email.com",
				name: "John Doe",
				password: "johndoe123",
			})
		).rejects.toThrow(new RegisterUserError());
	});
});
