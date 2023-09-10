import { CheckHealthReport } from "../../domain/entities/check-health-report";
import { CronManage } from "../../infra/cron/cron";
import { CheckHealthReportRepository } from "../../infra/database/mongodb/repositories/check-health-report-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { ClientAxios } from "../../infra/http/client";
import { LoggerWithPino } from "../../infra/logger/logger-adapter";
import { CreateCheckHealthReportController } from "../../presentation/controllers/check-health-report/create-check-health-report";
import { Controller } from "../../presentation/protocols/http";
import { CheckHealth } from "../../usecases/check-health";
import { CreateCheckHealthReport } from "../../usecases/create-check-health-report";

export const makeCreateCheckHealthReport = (): Controller => {
  const checkHealthReportRepository = new CheckHealthReportRepository();
  const userRepository = new UserRepository();
  const logger = new LoggerWithPino();
  const cron = new CronManage();
  const client = new ClientAxios();
  const checkHealth = new CheckHealth(checkHealthReportRepository, client);
  const createCheckHealthReport = new CreateCheckHealthReport(
    checkHealthReportRepository,
    userRepository,
    logger,
    cron,
    checkHealth
  );
  const createCheckHealthReportController =
    new CreateCheckHealthReportController(createCheckHealthReport);
  return createCheckHealthReportController;
};
