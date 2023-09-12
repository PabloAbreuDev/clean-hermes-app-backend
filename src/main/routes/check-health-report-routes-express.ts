import { Router } from "express";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeCreateCheckHealthReport } from "../factories/create-check-health-report";
import { makeCancelCheckHealth } from "../factories/cancel-check-health";
import { makeGetCheckHealthReports } from "../factories/get-check-health-reports";

const checkHealthReportRoutes = Router();
checkHealthReportRoutes.post("/", adaptRoute(makeCreateCheckHealthReport()));
checkHealthReportRoutes.get(
  "/:userId",
  adaptRoute(makeGetCheckHealthReports())
);
checkHealthReportRoutes.delete("/", adaptRoute(makeCancelCheckHealth()));
export default checkHealthReportRoutes;
