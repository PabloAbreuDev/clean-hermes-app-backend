import { Router } from "express";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeCreateCheckHealthReport } from "../factories/create-check-health-report";
import { makeCancelCheckHealth } from "../factories/cancel-check-health";
import { makeGetCheckHealthReports } from "../factories/get-check-health-reports";
import { jwtAuthentication } from "../middlewares/auth";

const checkHealthReportRoutes = Router();
checkHealthReportRoutes.post(
  "/",
  jwtAuthentication,
  adaptRoute(makeCreateCheckHealthReport())
);
checkHealthReportRoutes.get(
  "/",
  jwtAuthentication,
  adaptRoute(makeGetCheckHealthReports())
);
checkHealthReportRoutes.delete(
  "/",
  jwtAuthentication,
  adaptRoute(makeCancelCheckHealth())
);
export default checkHealthReportRoutes;
