import { ConfirmAccount, ConfirmAccountDto } from "../confirm-account";
import { ConfirmUserError } from "../errors/confirm-user-error";
import { UserNotFoundError } from "../errors/user-not-found";
import { mockUserRepository } from "./mocks/user-repository.mock";

describe("Confirm account", () => {
	it("Should confirm account correctly", async () => {
		jest.spyOn(mockUserRepository, "findByVerifyCode").mockResolvedValue({
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "",
			telegramChatId: 0,
			telegramToken: "",
			password: "",
		});

		jest.spyOn(mockUserRepository, "confirmAccount").mockResolvedValue({
			id: "1",
			verifyCode: "abc",
			verified: true,
			name: "",
			email: "",
			telegramChatId: 0,
			telegramToken: "",
			password: "",
		});

		const confirmAccountParams: ConfirmAccountDto = {
			verifyCode: "abc",
		};

		const confirmAccount = new ConfirmAccount(mockUserRepository);
		const sut = await confirmAccount.execute(confirmAccountParams);

		expect(sut).toMatchObject({ id: "1", verifyCode: "abc", verified: true });
		expect(mockUserRepository.findByVerifyCode).toHaveBeenCalledWith("abc");
	});

	it("Should throw an error if user not found", async () => {
		jest.spyOn(mockUserRepository, "findByVerifyCode").mockResolvedValue(null);
		const confirmAccount = new ConfirmAccount(mockUserRepository);

		await expect(confirmAccount.execute({ verifyCode: "abc" })).rejects.toThrow(
			new UserNotFoundError()
		);
	});

	it("Should throw an error if user not confirmed succefuly", async () => {
		jest.spyOn(mockUserRepository, "findByVerifyCode").mockResolvedValue({
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "",
			telegramChatId: 0,
			telegramToken: "",
			password: "",
		});

		jest.spyOn(mockUserRepository, "confirmAccount").mockRejectedValue(null);
		const confirmAccount = new ConfirmAccount(mockUserRepository);

		await expect(confirmAccount.execute({ verifyCode: "abc" })).rejects.toThrow(
			new ConfirmUserError()
		);
	});
});
