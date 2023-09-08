import { InvalidChatIdError } from "../errors/invalid-chat-id";
import { SendMailError } from "../errors/send-mail-error";
import { SendTelegramError } from "../errors/send-telegram-error";
import { UserNotFoundError } from "../errors/user-not-found";
import { SendNotification, SendNotificationDto } from "../send-notification";
import { mockEmailService } from "./mocks/email-service.mock";
import { mockNotificationRepository } from "./mocks/notification-repository.mock";
import { mockTelegramService } from "./mocks/telegram-service.mock";
import { mockUserRepository } from "./mocks/user-repository.mock";
describe("Send notification", () => {
  it("Should send a telegram notification correctly", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "TELEGRAM",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "",
        subject: "",
        text: "",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue({
      id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 123,
      telegramToken: "",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm",
    });
    jest.spyOn(mockTelegramService, "send").mockImplementation();
    jest.spyOn(mockNotificationRepository, "create").mockResolvedValue({
      id: "",
      name: "",
      description: "",
      additionalInfo: undefined,
    });
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );

    const sut = await sendNotification.execute(sendNotificationParams);
    expect(sut).toMatchObject({
      id: "",
      name: "",
      description: "",
      additionalInfo: undefined,
    });
    expect(mockUserRepository.findById).toHaveBeenCalledWith(
      sendNotificationParams.userId
    );
    expect(mockTelegramService.send).toHaveBeenCalledWith({
      text: sendNotificationParams.receiverTelegramOptions.text,
      to: sendNotificationParams.receiverTelegramOptions.to,
    });
    expect(mockNotificationRepository.create).toHaveBeenCalledWith(
      sendNotificationParams.notification
    );
  });
  it("Should send a email notification correctly", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "EMAIL",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "johndoe@email.com",
        subject: "Sample Email",
        text: "blablah!",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue({
      id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 123,
      telegramToken: "",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
    jest.spyOn(mockTelegramService, "send").mockImplementation();
    jest.spyOn(mockNotificationRepository, "create").mockResolvedValue({
      id: "",
      name: "",
      description: "",
      additionalInfo: undefined,
    });
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );

    const sut = await sendNotification.execute(sendNotificationParams);
    expect(sut).toMatchObject({
      id: "",
      name: "",
      description: "",
      additionalInfo: undefined,
    });
    expect(mockUserRepository.findById).toHaveBeenCalledWith(
      sendNotificationParams.userId
    );
    expect(mockEmailService.send).toHaveBeenCalledWith({
      to: sendNotificationParams.receiverEmailOptions.address,
      subject: sendNotificationParams.receiverEmailOptions.subject,
      text: sendNotificationParams.receiverEmailOptions.text,
    });
    expect(mockNotificationRepository.create).toHaveBeenCalledWith(
      sendNotificationParams.notification
    );
  });

  it("Should return an error if user not found", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "EMAIL",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "johndoe@email.com",
        subject: "Sample Email",
        text: "blablah!",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null);

    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );

    await expect(
      sendNotification.execute(sendNotificationParams)
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should return an error if is not possible to send email", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "EMAIL",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "",
        subject: "",
        text: "",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue({
      id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 0,
      telegramToken: "",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
    jest.spyOn(mockEmailService, "send").mockRejectedValue(null);

    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );
    await expect(
      sendNotification.execute(sendNotificationParams)
    ).rejects.toThrow(new SendMailError());
  });
  it("Should return an error if not telegram message is not sended correctly", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "TELEGRAM",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "",
        subject: "",
        text: "",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue({
      id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 123,
      telegramToken: "",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm", // pass123 encryptado
    });
    jest.spyOn(mockTelegramService, "send").mockRejectedValue(null);

    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );

    await expect(
      sendNotification.execute(sendNotificationParams)
    ).rejects.toThrow(new SendTelegramError());
  });

  it("Should return an error if user has no telegramChatId", async () => {
    const sendNotificationParams: SendNotificationDto = {
      notification: {
        name: "Sample Notification",
        description: "A simple description of a notification",
        additionalInfo: undefined,
      },
      receiverType: "TELEGRAM",
      userId: "abc",
      receiverTelegramOptions: {
        text: "Hello World",
        to: 123,
      },
      receiverEmailOptions: {
        address: "",
        subject: "",
        text: "",
      },
    };

    jest.spyOn(mockUserRepository, "findById").mockResolvedValue({
      id: "1",
      verifyCode: "abc",
      verified: false,
      name: "",
      email: "johndoe@email.com",
      telegramChatId: 0,
      telegramToken: "",
      password: "$2a$12$qAAfJgFofzsUs2oz0d1Od.qDcOxCsPT2S0aG3AyxZjJeOvHcpPPIm",
    });
    jest.spyOn(mockTelegramService, "send").mockImplementation();
    jest.spyOn(mockNotificationRepository, "create").mockResolvedValue({
      id: "",
      name: "",
      description: "",
      additionalInfo: undefined,
    });
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository
    );

    await expect(
      sendNotification.execute(sendNotificationParams)
    ).rejects.toThrow(new InvalidChatIdError());
  });
});
