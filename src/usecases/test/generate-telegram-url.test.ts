import config from "config";
import {
	GenerateTelegramUrl,
	GenerateTelegramUrlDto,
} from "../generate-telegram-url";
import { mockUserRepository } from "./mocks/user-repository.mock";
import { UserNotFoundError } from "../errors/user-not-found";

describe("Generate telegram url", () => {
	it("Should return a telegram url correctly", async () => {
		const mockedUser = {
			id: "1",
			verifyCode: "abc",
			verified: false,
			name: "",
			email: "johndoe@email.com",
			telegramChatId: 0,
			telegramToken: "abcde",
			password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
		};

		jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);

		const generateTelegramUrlParams: GenerateTelegramUrlDto = {
			id: "1",
		};
		const generateTelegramUrl = new GenerateTelegramUrl(mockUserRepository);
		const sut = await generateTelegramUrl.execute(generateTelegramUrlParams);
		expect(sut).toEqual(
			`https://www.telegram.me/${config.get("telegram.botName")}?start=${
				mockedUser.telegramToken
			}`
		);
	});

	it("Should throw an error if user not found", async () => {
		jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null);
		const generateTelegramUrl = new GenerateTelegramUrl(mockUserRepository);
		await expect(generateTelegramUrl.execute({ id: "1" })).rejects.toThrow(
			new UserNotFoundError()
		);
	});
});
