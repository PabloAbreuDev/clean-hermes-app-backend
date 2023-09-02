import express, { json } from "express";
import cors from "cors";
import notificationRoutes from "../infra/http/notification-routes-express";
import ConnectDatabase from "./config/connectDatabase";
import config from "config";
import userRoutes from "../infra/http/user-routes-express";

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
  console.log(`App is running on port ${port}`);
});
