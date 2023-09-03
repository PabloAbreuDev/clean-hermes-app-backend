import mongoose from "mongoose";
import Logger from "../../../utils/logger";

const ConnectDatabase = async (dbUrl: string) => {
	await mongoose.connect(dbUrl);
	Logger.info("Connected to database");
};

export default ConnectDatabase;
