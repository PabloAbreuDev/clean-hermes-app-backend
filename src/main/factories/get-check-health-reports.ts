import { CheckHealthReportRepository } from "../../infra/database/mongodb/repositories/check-health-report-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { GetCheckHealthReportsController } from "../../presentation/controllers/check-health-report/get-check-health-reports";
import { Controller } from "../../presentation/protocols/http";
import { GetCheckHealthReports } from "../../usecases/get-check-health-reports";

export const makeGetCheckHealthReports = (): Controller => {
  const checkHealthReportRepository = new CheckHealthReportRepository();
  const userRepository = new UserRepository();
  const getCheckHealthReports = new GetCheckHealthReports(
    checkHealthReportRepository,
    userRepository
  );
  const getCheckHealthReportsController = new GetCheckHealthReportsController(
    getCheckHealthReports
  );
  return getCheckHealthReportsController;
};
