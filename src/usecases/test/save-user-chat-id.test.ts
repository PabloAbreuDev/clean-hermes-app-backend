import { UserNotFoundError } from "../errors/user-not-found";
import { SaveUserChatId } from "../save-user-chatid";
import { mockUserRepository } from "./mocks/user-repository.mock";

describe("Save user chat id", () => {
  it("Should save a chat id succefully", async () => {
    jest.spyOn(mockUserRepository, "findByTelegramToken").mockResolvedValue({
      _id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 0,
      telegramToken: "abcde",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
    jest.spyOn(mockUserRepository, "saveChatId").mockResolvedValue({
      _id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 123,
      telegramToken: "abcde",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
    const saveUserChatId = new SaveUserChatId(mockUserRepository);
    const sut = await saveUserChatId.execute({
      chatId: 123,
      telegramToken: "abcde",
    });
    expect(sut).toMatchObject({
      _id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 123,
      telegramToken: "abcde",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
  });

  it("Should throw an error if user not found", async () => {
    jest
      .spyOn(mockUserRepository, "findByTelegramToken")
      .mockResolvedValue(null);
    const saveUserChatId = new SaveUserChatId(mockUserRepository);
    await expect(
      saveUserChatId.execute({
        chatId: 123,
        telegramToken: "abcde",
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should throw an error if chat id it not saved correctly", async () => {
    jest.spyOn(mockUserRepository, "findByTelegramToken").mockResolvedValue({
      _id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 0,
      telegramToken: "abcde",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });

    jest.spyOn(mockUserRepository, "saveChatId").mockRejectedValue(null);
    const saveUserChatId = new SaveUserChatId(mockUserRepository);
    const sut = await saveUserChatId.execute({
      chatId: 123,
      telegramToken: "abcde",
    });
    expect(sut).toBeUndefined();
  });
});
