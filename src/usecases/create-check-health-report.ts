import { CheckHealthReport } from "../domain/entities/check-health-report";
import {
  CreateCheckHealthReportDto,
  ICreateCheckHealthReport,
} from "../domain/usecases/create-check-health-report";
import { CheckHealth } from "./check-health";
import { CreateCheckHealthReportError } from "./errors/create-check-health-report";
import { UserNotFoundError } from "./errors/user-not-found";
import { ICronJob } from "./protocols/cron/cron-job";
import { ILogger } from "./protocols/logger/logger";
import { ICheckHealthReportRepository } from "./protocols/repositories/check-health-report-repository";
import { AlreadyExists } from "./protocols/repositories/index.ts";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class CreateCheckHealthReport implements ICreateCheckHealthReport {
  constructor(
    private readonly checkHealthRepository: ICheckHealthReportRepository,
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
    private readonly cronJob: ICronJob,
    private readonly checkHealth: CheckHealth
  ) {}

  async execute(
    data: CreateCheckHealthReportDto
  ): Promise<AlreadyExists<CheckHealthReport> | null> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const checkHealthReport = new CheckHealthReport({
      urlToCheck: data.url,
      userId: data.userId,
    });

    try {
      const checkHealthDatabaseObject = await this.checkHealthRepository.create(
        checkHealthReport
      );

      if (!checkHealthDatabaseObject) {
        throw new CreateCheckHealthReportError();
      }

      if (checkHealthDatabaseObject) {
        const called = this.cronJob.create({
          cronExpression: "1 * * * * *",
          callBackFunction: () =>
            this.checkHealth.execute({
              checkHealthId: checkHealthDatabaseObject.id,
              urlToCheck: data.url,
            }),
          id: checkHealthDatabaseObject.id,
        });

        if (!called) {
          throw new CreateCheckHealthReportError();
        }
      }
      return checkHealthDatabaseObject;
    } catch (err) {
      this.logger.error({ extraInfo: err });
      throw new CreateCheckHealthReportError();
    }
  }
}
