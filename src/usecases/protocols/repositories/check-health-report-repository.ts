import {
  CheckHealthReport,
  LogHealthCheck,
} from "../../../domain/entities/check-health-report.js";
import { IBaseRepository } from "./index.ts";

export interface ICheckHealthReportRepository
  extends IBaseRepository<CheckHealthReport> {
  addReport(log: LogHealthCheck, id: string): Promise<CheckHealthReport | null>;
}
