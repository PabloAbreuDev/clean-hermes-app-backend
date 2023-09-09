import express, { json } from "express";
import cors from "cors";
import ConnectDatabase from "../infra/database/mongodb/connectDatabase";
import config from "config";
import { initializeBot } from "../infra/messageria/telegram/telegram";
import Logger from "../utils/logger";
import notificationRoutes from "./routes/notification-routes-express";
import userRoutes from "./routes/user-routes-express";

// Basic configurations
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

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

// Graceful shutdown
process.on("unhandledRejection", (reason, promise) => {
  Logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );

  throw reason;
});

process.on("uncaughtException", (error) => {
  Logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

// Application Running
try {
  app.listen(port, async () => {
    await ConnectDatabase(config.get("dbUrl"));
    initializeBot();
    Logger.info(`App is running on port ${port}`);
  });

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
  exitSignals.map((sig) =>
    process.on(sig, async () => {
      try {
        Logger.info(`App exited with Success`);
        process.exit(ExitStatus.Success);
      } catch (err) {
        Logger.error(`App exited with error: ${err}`);
        process.exit(ExitStatus.Failure);
      }
    })
  );
} catch (err) {
  Logger.error(`App exited with error: ${err}`);
  process.exit(ExitStatus.Failure);
}
