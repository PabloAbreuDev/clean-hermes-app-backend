import { Router } from "express";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeCreateCheckHealthReport } from "../factories/create-check-health-report";
import { makeCancelCheckHealth } from "../factories/cancel-check-health";

const checkHealthReportRoutes = Router();
checkHealthReportRoutes.post("/", adaptRoute(makeCreateCheckHealthReport()));
checkHealthReportRoutes.delete("/", adaptRoute(makeCancelCheckHealth()));
export default checkHealthReportRoutes;
