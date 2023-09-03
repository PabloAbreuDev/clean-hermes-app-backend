import express, { json } from "express";
import cors from "cors";
import notificationRoutes from "../infra/http/notification-routes-express";
import ConnectDatabase from "../infra/database/mongodb/connectDatabase";
import config from "config";
import userRoutes from "../infra/http/user-routes-express";
import { initializeBot } from "../infra/messageria/telegram/telegram";
import Logger from "../utils/logger";

const app = express();

app.use(json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
		credentials: true,
	})
);

app.use("/notifications", notificationRoutes);
app.use("/users", userRoutes);

const port = config.get("port");

app.listen(port, async () => {
	await ConnectDatabase(config.get("dbUrl"));
	initializeBot();
	Logger.info(`App is running on port ${port}`);
});
