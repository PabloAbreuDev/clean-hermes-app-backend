import { CheckHealthReport } from "../domain/entities/check-health-report";
import {
  GetCheckHealthReportsDto,
  IGetCheckHealthReports,
} from "../domain/usecases/get-check-health-reports";
import { UserNotFoundError } from "./errors/user-not-found";
import { ICheckHealthReportRepository } from "./protocols/repositories/check-health-report-repository";
import { WithId } from "./protocols/repositories/index.ts";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class GetCheckHealthReports implements IGetCheckHealthReports {
  constructor(
    private readonly checkHealthRepository: ICheckHealthReportRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(
    data: GetCheckHealthReportsDto
  ): Promise<WithId<CheckHealthReport>[] | null> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return await this.checkHealthRepository.find({ userId: data.userId });
  }
}
