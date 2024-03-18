import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI || "";
const connectdb = async () => {
  try {
    const con = await mongoose.connect(uri);
    console.log("connected ...");
  } catch (error) {
    console.log(error.message, uri);
    process.exit(-1);
  }
};

export default connectdb;
