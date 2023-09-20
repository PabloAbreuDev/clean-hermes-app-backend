import { LoggerWithPino } from "../../infra/logger/logger-adapter";
import { CheckHealth } from "../check-health";
import { CreateCheckHealthReport } from "../create-check-health-report";
import { CreateCheckHealthReportError } from "../errors/create-check-health-report";
import { UserNotFoundError } from "../errors/user-not-found";
import { mockedCheckHealthReport } from "./mocks/check-health-report.mock";
import { mockCheckHealthRepository } from "./mocks/check-health-repository.mock";
import { mockClient } from "./mocks/client.mock";
import { mockCron } from "./mocks/cron.mock";
import { mockUserRepository } from "./mocks/user-repository.mock";
import { mockedUser } from "./mocks/user.mock";

describe("Create check health report", () => {
  it("Should create a check health report", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "create")
      .mockResolvedValue(mockedCheckHealthReport);
    jest.spyOn(mockCron, "create").mockReturnValue(true);

    const createCheckHealthReport = new CreateCheckHealthReport(
      mockCheckHealthRepository,
      mockUserRepository,
      new LoggerWithPino(),
      mockCron,
      new CheckHealth(mockCheckHealthRepository, mockClient)
    );
    const sut = await createCheckHealthReport.execute({
      url: mockedCheckHealthReport.urlToCheck,
      userId: mockedCheckHealthReport.userId,
    });

    expect(sut).toBeTruthy();
    expect(sut).toHaveProperty("id");
    expect(sut!.id).toBe("1");
    expect(mockUserRepository.findById).toBeCalled()
    expect(mockUserRepository.findById).toBeCalledWith(mockedCheckHealthReport.userId)
    expect(mockCron.create).toBeCalledTimes(1)
  });

  it("Should throw an error if user not found", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null);
    const createCheckHealthReport = new CreateCheckHealthReport(
      mockCheckHealthRepository,
      mockUserRepository,
      new LoggerWithPino(),
      mockCron,
      new CheckHealth(mockCheckHealthRepository, mockClient)
    );
    await expect(
      createCheckHealthReport.execute({
        url: mockedCheckHealthReport.urlToCheck,
        userId: mockedCheckHealthReport.userId,
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("Should throw an error if check health report is not created", async () => {
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "create")
      .mockRejectedValue(new Error());

    const createCheckHealthReport = new CreateCheckHealthReport(
      mockCheckHealthRepository,
      mockUserRepository,
      new LoggerWithPino(),
      mockCron,
      new CheckHealth(mockCheckHealthRepository, mockClient)
    );
    await expect(
      createCheckHealthReport.execute({
        url: mockedCheckHealthReport.urlToCheck,
        userId: mockedCheckHealthReport.userId,
      })
    ).rejects.toThrow(new CreateCheckHealthReportError());
  });

  it("Should throw an error if cron job is not created", async ()=>{
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser);
    jest
      .spyOn(mockCheckHealthRepository, "create")
      .mockResolvedValue(mockedCheckHealthReport);
    jest.spyOn(mockCron, "create").mockReturnValue(false);

    const createCheckHealthReport = new CreateCheckHealthReport(
      mockCheckHealthRepository,
      mockUserRepository,
      new LoggerWithPino(),
      mockCron,
      new CheckHealth(mockCheckHealthRepository, mockClient)
    );

    await expect(
      createCheckHealthReport.execute({
        url: mockedCheckHealthReport.urlToCheck,
        userId: mockedCheckHealthReport.userId,
      })
    ).rejects.toThrow(new CreateCheckHealthReportError());
  })
});
