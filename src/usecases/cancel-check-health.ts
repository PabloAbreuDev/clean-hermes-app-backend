import {
  CancelCheckHealthDto,
  ICancelCheckHealth,
} from "../domain/usecases/cancel-check-health";
import { CheckHealthReportNotFoundError } from "./errors/check-health-not-found";
import { UserNotFoundError } from "./errors/user-not-found";
import { ICronJob } from "./protocols/cron/cron-job";
import { ICheckHealthReportRepository } from "./protocols/repositories/check-health-report-repository";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class CancelCheckHealth implements ICancelCheckHealth {
  constructor(
    private readonly checkHealthRepository: ICheckHealthReportRepository,
    private readonly userRepository: IUserRepository,
    private readonly cron: ICronJob
  ) {}
  async execute(data: CancelCheckHealthDto): Promise<boolean> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const checkHealth = await this.checkHealthRepository.findById(
      data.checkHealthId
    );

    if (
      !checkHealth ||
      checkHealth.userId !== data.userId ||
      !checkHealth.active
    ) {
      throw new CheckHealthReportNotFoundError();
    }

    try {
      this.cron.cancel({ id: checkHealth.id });
      return !!(await this.checkHealthRepository.cancelCheckHealth(
        data.checkHealthId
      ));
    } catch (err) {
      throw new Error("Something went wrong");
    }
  }
}
