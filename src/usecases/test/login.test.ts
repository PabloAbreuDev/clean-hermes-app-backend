import { EmailOrPasswordInvalidError } from "../errors/email-or-pass-invalid";
import { UserNotFoundError } from "../errors/user-not-found";
import { Login, LoginDto } from "../login";
import { mockUserRepository } from "./mocks/user-repository.mock";

describe("Login", () => {
	it("Should login correctly", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue({
			_id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 0,
			telegramToken: "",
			password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
		});

		const loginParams: LoginDto = {
			email: "johndoe@email.com",
			password: "pass123",
		};

		const login = new Login(mockUserRepository);
		const sut = await login.execute(loginParams);
		expect(sut).toHaveProperty("accessToken");
		expect(sut).toHaveProperty("refreshToken");
	});
	it("Should throw an error if user not found", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null);
		const login = new Login(mockUserRepository);
		await expect(
			login.execute({
				email: "johndoe@email.com",
				password: "pass123",
			})
		).rejects.toThrow(new UserNotFoundError());
	});
	it("Should throw an error if password is invalid", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue({
			_id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 0,
			telegramToken: "",
			password: "invalidhash!", // pass123 encryptado
		});

		const login = new Login(mockUserRepository);
		await expect(
			login.execute({
				email: "johndoe@email.com",
				password: "pass123",
			})
		).rejects.toThrow(new EmailOrPasswordInvalidError());
	});
});
