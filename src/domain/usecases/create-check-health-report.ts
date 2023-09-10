import { CheckHealthReport } from "../entities/check-health-report";

export interface CreateCheckHealthReportDto {
  url: string;
  userId: string;
}
export interface ICreateCheckHealthReport {
  execute(data: CreateCheckHealthReportDto): Promise<CheckHealthReport | null>;
}
