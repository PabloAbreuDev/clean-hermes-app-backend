import { CronManage } from "../../infra/cron/cron";
import { CheckHealthReportRepository } from "../../infra/database/mongodb/repositories/check-health-report-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { CancelCheckHealthController } from "../../presentation/controllers/check-health-report/cancel-check-health";
import { Controller } from "../../presentation/protocols/http";
import { CancelCheckHealth } from "../../usecases/cancel-check-health";

export const makeCancelCheckHealth = (): Controller => {
  const checkHealthRepository = new CheckHealthReportRepository();
  const userRepository = new UserRepository();
  const cron = new CronManage();
  const cancelCheckHealth = new CancelCheckHealth(
    checkHealthRepository,
    userRepository,
    cron
  );
  const checkHealthController = new CancelCheckHealthController(
    cancelCheckHealth
  );
  return checkHealthController;
};
