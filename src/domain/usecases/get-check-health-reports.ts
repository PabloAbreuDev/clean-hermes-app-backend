import { AlreadyExists } from "../../usecases/protocols/repositories/index.ts";
import { CheckHealthReport } from "../entities/check-health-report";

export interface GetCheckHealthReportsDto {
  userId: string;
}

export interface IGetCheckHealthReports {
  execute(
    data: GetCheckHealthReportsDto
  ): Promise<AlreadyExists<CheckHealthReport>[] | null>;
}
