import { AlreadyExists } from "../../usecases/protocols/repositories/index.ts";
import { CheckHealthReport } from "../entities/check-health-report";

export interface CreateCheckHealthReportDto {
  url: string;
  userId: string;
}
export interface ICreateCheckHealthReport {
  execute(data: CreateCheckHealthReportDto): Promise<AlreadyExists<CheckHealthReport> | null>;
}
