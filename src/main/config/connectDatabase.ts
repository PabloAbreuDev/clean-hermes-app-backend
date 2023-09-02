import mongoose from "mongoose";

const ConnectDatabase = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDatabase;
