import { CheckHealthReport } from "../../domain/entities/check-health-report";
import { CheckHealthReportRepository } from "../../infra/database/mongodb/repositories/check-health-report-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { LoggerWithPino } from "../../infra/logger/logger-adapter";
import { CreateCheckHealthReportController } from "../../presentation/controllers/check-health-report/create-check-health-report";
import { Controller } from "../../presentation/protocols/http";
import { CreateCheckHealthReport } from "../../usecases/create-check-health-report";

export const makeCreateCheckHealthReport = (): Controller => {
  const checkHealthReportRepository = new CheckHealthReportRepository();
  const userRepository = new UserRepository();
  const logger = new LoggerWithPino();
  const createCheckHealthReport = new CreateCheckHealthReport(
    checkHealthReportRepository,
    userRepository,
    logger
  );
  const createCheckHealthReportController =
    new CreateCheckHealthReportController(createCheckHealthReport);
  return createCheckHealthReportController;
};
