import mongoose from "mongoose";
import Jobs from "./models/jobs.js";
import Users from "./models/users.js";
import dotenv from "dotenv";
import mongo from "./mongoose/mongoose.js";
import users from "./data/users.js";
import jobs from "./data/jobs.js";
dotenv.config();

mongo();

const dataimport = async () => {
  try {
    await Jobs.deleteMany();
    await Users.deleteMany();

    const createdUser = await Users.insertMany(users);
    const creator = createdUser[0]._id;

    const updatedJobs = jobs.map((curr) => {
      return { ...curr, user: creator };
    });
    await Jobs.insertMany(updatedJobs);

    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

dataimport();
