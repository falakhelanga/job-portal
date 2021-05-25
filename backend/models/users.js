import mongoose from "mongoose";
import {
  personalSchema,
  workExperienceSchema,
  educationSchema,
} from "../mongoose/schemas.js";
const Schema = mongoose.Schema;

const users_Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmployer: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile: {
      personal: personalSchema,
      experience: {
        complete: {
          type: Number,
          default: 0,
        },
        workExperience: [workExperienceSchema],
      },
      education: {
        complete: {
          type: Number,
          default: 0,
        },
        educations: [educationSchema],
      },
    },

    wishList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Jobs",
      },
    ],
    applications: [
      {
        job: {
          type: mongoose.Types.ObjectId,
          ref: "Jobs",
        },

        status: {
          type: String,
        },
        appliedAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", users_Schema);

export default Users;
