import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const personalSchema = new Schema({
  profile_url: {
    type: String,
    default: "",
  },
  complete: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  ethnicity: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  citizeship: {
    type: String,
    default: "",
  },
  saId: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: "",
  },
  relocate: {
    type: String,
    default: "",
  },
  currCity: {
    type: String,
    default: "",
  },
  disability: {
    type: String,
    default: "",
  },
  introduction: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});

export const workExperienceSchema = new Schema({
  jobTitle: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    default: "",
  },
  endDate: {
    type: Date,
    default: "",
  },
  current: {
    type: Boolean,
    default: false,
  },
  industry: {
    type: String,
    default: "",
  },
  jobCategory: {
    type: String,
    default: "",
  },
});

export const educationSchema = new Schema({
  gradyear: {
    type: String,
    default: "",
  },
  subjects: {
    type: String,
    default: "",
  },
  institution: {
    type: String,
    default: "",
  },
  qualification: {
    type: String,
    default: "",
  },
});
