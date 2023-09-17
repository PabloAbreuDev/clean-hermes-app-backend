import { CancelCheckHealth } from "../cancel-check-health";
import { CheckHealthReportNotFoundError } from "../errors/check-health-not-found";
import { UserNotFoundError } from "../errors/user-not-found";
import { mockCheckHealthRepository } from "./mocks/check-health-repository.mock";
import { mockCron } from "./mocks/cron.mock";
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

const mockedHealthCheckReport = {
  id: "1",
  urlToCheck: "http://localhost:3001",
  userId: mockedUser.id,
  active: true,
  logs: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Cancel check health", () => {
  it("Should cancel correctly a check health", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "findById")
      .mockResolvedValue(mockedHealthCheckReport);
    jest.spyOn(mockCron, "cancel").mockImplementation(() => {
      return true;
    });
    jest
      .spyOn(mockCheckHealthRepository, "cancelCheckHealth")
      .mockResolvedValue({ ...mockedHealthCheckReport, active: false });

    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );

    const sut = await cancelCheckHealth.execute({
      userId: mockedUser.id,
      checkHealthId: mockedHealthCheckReport.id,
    });
    expect(sut).toBeTruthy();
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id);
    expect(mockCheckHealthRepository.findById).toBeCalledWith(
      mockedHealthCheckReport.id
    );
    expect(mockCron.cancel).toBeCalledTimes(1);
  });

  it("Should thrown an error if user not found", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null);
    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );
    await expect(
      cancelCheckHealth.execute({
        userId: mockedUser.id,
        checkHealthId: mockedHealthCheckReport.id,
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should thrown an error if check health not found", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest.spyOn(mockCheckHealthRepository, "findById").mockResolvedValue(null);

    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );
    await expect(
      cancelCheckHealth.execute({
        userId: mockedUser.id,
        checkHealthId: mockedHealthCheckReport.id,
      })
    ).rejects.toThrow(new CheckHealthReportNotFoundError());
  });

  it("Should thrown an error if CheckHealth user id is differente from user id passed", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "findById")
      .mockResolvedValue({ ...mockedHealthCheckReport, userId: "123" });
    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );
    await expect(
      cancelCheckHealth.execute({
        userId: mockedUser.id,
        checkHealthId: mockedHealthCheckReport.id,
      })
    ).rejects.toThrow(new CheckHealthReportNotFoundError());
  });

  it("Should thrown an error if check health is inactive", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "findById")
      .mockResolvedValue({ ...mockedHealthCheckReport, active: false });
    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );
    await expect(
      cancelCheckHealth.execute({
        userId: mockedUser.id,
        checkHealthId: mockedHealthCheckReport.id,
      })
    ).rejects.toThrow(new CheckHealthReportNotFoundError());
  });

  it("Should thrown an error if something went wrong on cancelling", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "findById")
      .mockResolvedValue(mockedHealthCheckReport);
    jest.spyOn(mockCron, "cancel").mockImplementation(() => {
      throw Error();
    });
    jest
      .spyOn(mockCheckHealthRepository, "cancelCheckHealth")
      .mockResolvedValue({ ...mockedHealthCheckReport, active: false });

    const cancelCheckHealth = new CancelCheckHealth(
      mockCheckHealthRepository,
      mockUserRepository,
      mockCron
    );

    await expect(
      cancelCheckHealth.execute({
        userId: mockedUser.id,
        checkHealthId: mockedHealthCheckReport.id,
      })
    ).rejects.toThrow(new Error("Something went wrong"));
  });
});
