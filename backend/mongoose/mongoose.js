import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to database");
  } catch (error) {
    const err = new Error(
      "the server is down at the moment please try to visit this website after 15 minutes"
    );
    err.code = 500;
    throw err;
  }
};

export default mongo;
