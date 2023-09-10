import { CheckHealthReport } from "../domain/entities/check-health-report";
import {
  CreateCheckHealthReportDto,
  ICreateCheckHealthReport,
} from "../domain/usecases/create-check-health-report";
import { CreateCheckHealthReportError } from "./errors/create-check-health-report";
import { UserNotFoundError } from "./errors/user-not-found";
import { ILogger } from "./protocols/logger/logger";
import { ICheckHealthReportRepository } from "./protocols/repositories/check-health-report-repository";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class CreateCheckHealthReport implements ICreateCheckHealthReport {
  constructor(
    private readonly checkHealthRepository: ICheckHealthReportRepository,
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger
  ) {}

  async execute(
    data: CreateCheckHealthReportDto
  ): Promise<CheckHealthReport | null> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      const checkHealthReport = new CheckHealthReport({
        urlToCheck: data.url,
        userId: data.userId,
      });

      return await this.checkHealthRepository.create(checkHealthReport);
    } catch (err) {
      this.logger.error({
        description: "Error creating check health report",
        extraInfo: err,
      });
      throw new CreateCheckHealthReportError();
    }
  }
}
