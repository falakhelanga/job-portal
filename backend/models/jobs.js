import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    job_type: {
      type: String,
      required: true,
    },
    company_details: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },

    benefical: {
      type: String,
    },
    sectors: {
      type: String,
      required: true,
    },
    applicants: [
      {
        type: Schema.Types.ObjectId,

        ref: "Users",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", jobsSchema);

export default Jobs;
