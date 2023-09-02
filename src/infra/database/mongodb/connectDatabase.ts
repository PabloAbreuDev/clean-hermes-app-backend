import mongoose from "mongoose";
import Logger from "../../../utils/logger";

const ConnectDatabase = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    Logger.info("Connected to database");
  } catch (err) {
    Logger.error(err);
  }
};

export default ConnectDatabase;
