import mongoose from "mongoose";
import { LoggerWithPino } from "../../logger/logger-adapter";

const ConnectDatabase = async (dbUrl: string) => {
  const Logger = new LoggerWithPino();
  await mongoose.connect(dbUrl);
  Logger.info({ description: "Connected to database" });
};

export default ConnectDatabase;
