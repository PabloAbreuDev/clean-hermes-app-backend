import { ConfirmAccount } from "../confirm-account";
import { ConfirmUserError } from "../errors/confirm-user-error";
import { UserNotFoundError } from "../errors/user-not-found";
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
describe("Confirm account", () => {
  it("Should confirm an account propertly", async () => {
    jest
      .spyOn(mockUserRepository, "findByVerifyCode")
      .mockResolvedValue(mockedUser);
    jest.spyOn(mockUserRepository, "confirmAccount").mockResolvedValue({
      ...mockedUser,
      verified: true,
      verifyCode: "",
    });
    const confirmAccount = new ConfirmAccount(mockUserRepository);
    const sut = await confirmAccount.execute({
      verifyCode: mockedUser.verifyCode,
    });

    expect(mockUserRepository.findByVerifyCode).toBeCalledTimes(1);
    expect(mockUserRepository.findByVerifyCode).toBeCalledWith(
      mockedUser.verifyCode
    );
    expect(mockUserRepository.confirmAccount).toBeCalledTimes(1);
    expect(mockUserRepository.confirmAccount).toBeCalledWith(mockedUser.id);
    expect(sut).toMatchObject({
      ...mockedUser,
      verified: true,
      verifyCode: "",
    });
  });

  it("Should throw an error if user not found", async () => {
    jest.spyOn(mockUserRepository, "findByVerifyCode").mockResolvedValue(null);
    const confirmAccount = new ConfirmAccount(mockUserRepository);
    await expect(
      confirmAccount.execute({
        verifyCode: mockedUser.verifyCode,
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should throw an error if something went wrong", async () => {
    jest
      .spyOn(mockUserRepository, "findByVerifyCode")
      .mockResolvedValue(mockedUser);
    jest
      .spyOn(mockUserRepository, "confirmAccount")
      .mockRejectedValue(new Error());
    const confirmAccount = new ConfirmAccount(mockUserRepository);
    await expect(
      confirmAccount.execute({
        verifyCode: mockedUser.verifyCode,
      })
    ).rejects.toThrow(new ConfirmUserError());
  });
});
