import { EmailOrPasswordInvalidError } from "../errors/email-or-pass-invalid";
import { UserNotFoundError } from "../errors/user-not-found";
import { Login } from "../login";
import { mockEncrypter } from "./mocks/encrypter.mock";
import { mockHashComparer } from "./mocks/hash-comparer.mock";
import { mockUserRepository } from "./mocks/user-repository.mock";

const mockedUser = {
	id: "1",
	verifyCode: "abc",
	verified: false,
	name: "",
	email: "johndoe@email.com",
	telegramChatId: 0,
	telegramToken: "",
	password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // Encrypted for pass123
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("Login", () => {
	it("Should do login correctly", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(mockedUser);
		jest.spyOn(mockHashComparer, "compare").mockResolvedValue(true);
		jest.spyOn(mockEncrypter, "encrypt").mockResolvedValue("encrypted");

		const login = new Login(
			mockUserRepository,
			mockEncrypter,
			mockHashComparer
		);

		const sut = await login.execute({
			email: "johndoe@email.com",
			password: "pass123",
		});

		expect(typeof sut).toBe("string");
		expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
			mockedUser.email
		);
		expect(mockEncrypter.encrypt).toHaveBeenCalledWith(mockedUser.id);
	});

	it("Should return an error if user not found", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null);
		const login = new Login(
			mockUserRepository,
			mockEncrypter,
			mockHashComparer
		);
		await expect(
			login.execute({
				email: "johndoe@email.com",
				password: "pass123",
			})
		).rejects.toThrow(new UserNotFoundError());
	});

	it("Should return an error if email or password is invalid", async () => {
		jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(mockedUser);
		jest.spyOn(mockHashComparer, "compare").mockResolvedValue(false);
		const login = new Login(
			mockUserRepository,
			mockEncrypter,
			mockHashComparer
		);
		await expect(
			login.execute({
				email: "johndoe@email.com",
				password: "pass123",
			})
		).rejects.toThrow(new EmailOrPasswordInvalidError());
	});
});
