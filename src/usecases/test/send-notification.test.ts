import { LoggerWithPino } from "../../infra/logger/logger-adapter";
import { CreateNotificationError } from "../errors/create-notification";
import { InvalidChatIdError } from "../errors/invalid-chat-id";
import { SendMailError } from "../errors/send-mail-error";
import { SendTelegramError } from "../errors/send-telegram-error";
import { UserNotFoundError } from "../errors/user-not-found";
import { SendNotification } from "../send-notification";
import { mockEmailService } from "./mocks/email-service.mock";
import { mockNotificationRepository } from "./mocks/notification-repository.mock";
import { mockedNotification } from "./mocks/notification.mock";
import { mockTelegramService } from "./mocks/telegram-service.mock";
import { mockUserRepository } from "./mocks/user-repository.mock";
import { mockedUser } from "./mocks/user.mock";

describe("Send notification", () => {
  it("Should create a notification and send email", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockNotificationRepository, "create")
      .mockResolvedValue(mockedNotification);
    jest.spyOn(mockEmailService, "send");
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    const sut = await sendNotification.execute({
      notification: {
        name: mockedNotification.name,
        description: mockedNotification.description,
        additionalInfo: mockedNotification.additionalInfo,
      },
      receiverType: "EMAIL",
      userId: mockedUser.id,
      receiverEmailOptions: {
        address: mockedUser.email,
        subject: mockedNotification.description,
        text: "Sample text",
      },
      receiverTelegramOptions: {
        to: 0,
        text: "",
      },
    });
    expect(sut).toStrictEqual(mockedNotification);
    expect(mockEmailService.send).toBeCalled();
    expect(mockEmailService.send).toBeCalledWith({
      to: mockedUser.email,
      subject: mockedNotification.description,
      text: "Sample text",
    });
    expect(mockTelegramService.send).not.toBeCalled();
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id);
  });

  it("Should create a notification and send telegram", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockNotificationRepository, "create")
      .mockResolvedValue(mockedNotification);
    jest.spyOn(mockEmailService, "send");
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    const sut = await sendNotification.execute({
      notification: {
        name: mockedNotification.name,
        description: mockedNotification.description,
        additionalInfo: mockedNotification.additionalInfo,
      },
      receiverType: "TELEGRAM",
      userId: mockedUser.id,
      receiverEmailOptions: {
        address: "",
        subject: "",
        text: "",
      },
      receiverTelegramOptions: {
        to: mockedUser.telegramChatId,
        text: "Sample text",
      },
    });
    expect(sut).toStrictEqual(mockedNotification);
    expect(mockTelegramService.send).toBeCalled();
    expect(mockTelegramService.send).toBeCalledWith({
      to: mockedUser.telegramChatId,
      text: "Sample text",
    });
    expect(mockEmailService.send).not.toBeCalled();
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id);
  });

  it("Should throw an error if user not found", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null);
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "EMAIL",
        userId: mockedUser.id,
        receiverEmailOptions: {
          address: mockedUser.email,
          subject: mockedNotification.description,
          text: "Sample text",
        },
        receiverTelegramOptions: {
          to: 0,
          text: "",
        },
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should throw an error if receiverOptions not passed correctly", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "EMAIL",
        userId: mockedUser.id,
        receiverEmailOptions: { address: "", subject: "", text: "" },
        receiverTelegramOptions: {
          to: 0,
          text: "",
        },
      })
    ).rejects.toThrow(new SendMailError());
  });

  it("Should throw an error if something went wrong on send email", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest.spyOn(mockEmailService, "send").mockRejectedValue(new Error());
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "EMAIL",
        userId: mockedUser.id,
        receiverEmailOptions: {
          address: mockedUser.email,
          subject: mockedNotification.description,
          text: "Sample text",
        },
        receiverTelegramOptions: {
          to: 0,
          text: "",
        },
      })
    ).rejects.toThrow(new SendMailError());
  });

  it("Should throw an error if telegram chat id is not passed", async () => {
    jest
      .spyOn(mockUserRepository, "findById")
      .mockResolvedValue({ ...mockedUser, telegramChatId: 0 });
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "TELEGRAM",
        userId: "",
        receiverEmailOptions: {
          address: mockedUser.email,
          subject: mockedNotification.description,
          text: "Sample text",
        },
        receiverTelegramOptions: {
          to: 0,
          text: "",
        },
      })
    ).rejects.toThrow(new InvalidChatIdError());
  });

  it("Should throw an error if something went wrong on send chat id", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest.spyOn(mockTelegramService, "send").mockRejectedValue(new Error());
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "TELEGRAM",
        userId: mockedUser.id,
        receiverEmailOptions: {
          address: mockedUser.email,
          subject: mockedNotification.description,
          text: "Sample text",
        },
        receiverTelegramOptions: {
          to: mockedUser.telegramChatId,
          text: "",
        },
      })
    ).rejects.toThrow(new SendTelegramError());
  });

  it("Should throw an error if something went wrong on create notification", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest.spyOn(mockEmailService, "send");
    jest
      .spyOn(mockNotificationRepository, "create")
      .mockRejectedValue(new Error());
    jest.spyOn(mockEmailService, "send").mockResolvedValue();
    const sendNotification = new SendNotification(
      mockEmailService,
      mockTelegramService,
      mockNotificationRepository,
      mockUserRepository,
      new LoggerWithPino()
    );
    await expect(
      sendNotification.execute({
        notification: {
          name: mockedNotification.name,
          description: mockedNotification.description,
          additionalInfo: mockedNotification.additionalInfo,
        },
        receiverType: "EMAIL",
        userId: mockedUser.id,
        receiverEmailOptions: {
          address: mockedUser.email,
          subject: mockedNotification.description,
          text: "Sample text",
        },
        receiverTelegramOptions: {
          to: 0,
          text: "",
        },
      })
    ).rejects.toThrow(new CreateNotificationError());
  });
});
