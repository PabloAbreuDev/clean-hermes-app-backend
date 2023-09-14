import { Router } from "express";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeCreateCheckHealthReport } from "../factories/create-check-health-report";
import { makeCancelCheckHealth } from "../factories/cancel-check-health";
import { makeGetCheckHealthReports } from "../factories/get-check-health-reports";
import { jwtAuthentication } from "../middlewares/auth";
import { createCheckHealth } from "../middlewares/validators/check-health-validator";
import { checkRules } from "../middlewares/validators/validator";

const checkHealthReportRoutes = Router();
checkHealthReportRoutes.post(
  "/",
  jwtAuthentication,
  createCheckHealth,
  checkRules,
  adaptRoute(makeCreateCheckHealthReport())
);
checkHealthReportRoutes.get(
  "/",
  jwtAuthentication,
  adaptRoute(makeGetCheckHealthReports())
);
checkHealthReportRoutes.delete(
  "/:checkHealthId",
  jwtAuthentication,
  adaptRoute(makeCancelCheckHealth())
);
export default checkHealthReportRoutes;
