import { Router } from "express";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeCreateCheckHealthReport } from "../factories/create-check-health-report";

const checkHealthReportRoutes = Router();
checkHealthReportRoutes.post("/", adaptRoute(makeCreateCheckHealthReport()));
export default checkHealthReportRoutes;
