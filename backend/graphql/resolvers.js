import Users from "../models/users.js";
import Jobs from "../models/jobs.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import tokenGenerator from "../utils/tokenGenerator.js";
import imageDeleter from "../utils/imageDelete.js";
import mongoose from "mongoose";
const resolvers = {
  // USER REGISTRATION RESOLVER

  userRegister: asyncHandler(async ({ userInput, req }) => {
    const { email, name, password, isEmployer } = userInput;

    const user = await Users.findOne({ email: email });

    if (user) throw new Error("This email is already taken");

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await Users.create({
      email,
      name,
      password: hashedPassword,
      isEmployer: isEmployer,
      profile: {
        personal: {},
        experience: [],
        education: [],
      },
      wishList: [],
    });

    return {
      name: createdUser.name,
      email: createdUser.email,
      token: tokenGenerator(createdUser._id),
      isEmployer: createdUser.isEmployer,
    };
  }),

  // USE LOGIN RESOLVER

  userLogin: asyncHandler(async ({ userInput }, req) => {
    const { email, password } = userInput;
    const userFound = await Users.findOne({ email });

    if (!userFound) {
      throw new Error("this email does not exist");
    }

    const comparedPassword = await bcrypt.compare(password, userFound.password);

    if (!comparedPassword) {
      console.log(comparedPassword);
      throw new Error("You entered wrong password");
    }

    return {
      name: userFound.name,
      email: userFound.email,
      token: tokenGenerator(userFound._id),
      isEmployer: userFound.isEmployer,
    };
  }),

  // JOB CREATION RESOLVER

  createJob: asyncHandler(async ({ jobInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("You are not authenthicated");
      error.code = 401;
      throw error;
    }

    const userFound = await Users.findById(req.userId);

    if (!userFound.isEmployer) {
      const error = new Error(
        "You must be reagistered as an employer to post a job"
      );
      error.code = 401;
      throw error;
    }
    const {
      title,
      company,
      image_url,
      location,
      salary,
      job_type,
      company_details,
      job_description,
      qualification,
      requirements,
      benefical,
      sectors,
    } = jobInput;

    await Jobs.create({
      title,
      company,
      image_url,
      location,
      salary,
      job_type,
      company_details,
      job_description,
      qualification,
      requirements,
      benefical,
      sectors,
      applicants: [],
      user: userFound._id,
    });

    return { message: "Job created succefulfy" };
  }),

  // GETTING EMPLOYER POSTS

  posts: asyncHandler(async ({ postInput: { page } }, req) => {
    const userId = req.userId;
    const itemsPerPage = 10;

    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userFound = await Users.findById(userId);
    if (!userFound.isEmployer) {
      const error = new Error("you are not authorized to post");
      error.code = 401;
      throw error;
    }

    const totalJobs = await Jobs.countDocuments({ user: userId });
    const jobsFound = await Jobs.find({ user: userId })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .sort({ createdAt: "desc" });

    if (!jobsFound) {
      const error = new Error("You dont have post, please create new post");
      error.code = 404;
      throw error;
    }

    const modifiedData = jobsFound.map((curr) => {
      return {
        ...curr._doc,
        createdAt: curr._doc.createdAt.toISOString(),
        _id: curr._doc._id.toString(),
        applicants: curr._doc.applicants,
      };
    });

    const modified2 = modifiedData.map((curr) => {
      return {
        title: curr.title,
        sectors: curr.sectors,
        createdAt: curr.createdAt,
        _id: curr._id,
        applicants: curr.applicants,
      };
    });

    return {
      employerPosts: modified2,
      totalJobs: Math.ceil(totalJobs / itemsPerPage),
    };
  }),

  postDelete: asyncHandler(async ({ posterInput }, req) => {
    const { postId } = posterInput;
    const mongoId = mongoose.Types.ObjectId(postId);
    const userId = req.userId;
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userFound = await Users.findById(userId);
    if (!userFound.isEmployer) {
      const error = new Error("you are not authorized to post");
      error.code = 401;
      throw error;
    }

    const found = await Jobs.findByIdAndDelete(mongoId);
    imageDeleter(found.image_url);

    return {
      message: `${found.title} post is deleted successflly`,
    };
  }),

  // FETCHING ALL JOBS

  allJobsFetch: asyncHandler(async ({ pagenumber: { page } }, req) => {
    const jobsPerPage = 10;

    const jobs = await Jobs.find()
      .skip((page - 1) * jobsPerPage)
      .limit(jobsPerPage)
      .sort({
        createdAt: "desc",
      });

    const totalJobs = await Jobs.countDocuments();

    const fetchedJobs = jobs.map((curr) => {
      return {
        title: curr._doc.title,
        jobId: curr._doc._id.toString(),
        createdAt: curr._doc.createdAt.toISOString(),
        image_url: curr._doc.image_url ? curr._doc.image_url : "",
        location: curr._doc.location,
        company: curr._doc.company,
        description: curr._doc.job_description,
      };
    });

    return {
      jobPost: fetchedJobs,
      jobsTotal: Math.ceil(totalJobs / jobsPerPage),
    };
  }),

  // FETCH SINGLE JOB
  fetchSingleJob: asyncHandler(async ({ jobId }, req) => {
    const job = await Jobs.findById(jobId.postId);

    if (!job) {
      const error = new Error("no job found ");
      error.code = 404;
      throw error;
    }

    const similarJobs = await Jobs.find({ sectors: job.sectors })
      .limit(10)
      .sort({ createdAt: "desc" });

    const fetchedJobs = similarJobs.map((curr) => {
      return {
        title: curr.title,
        jobId: curr._id.toString(),
        createdAt: curr.createdAt.toISOString(),
        image_url: curr.image_url ? curr._doc.image_url : "",
        location: curr.location,
        company: curr.company,
        description: curr.job_description,
      };
    });

    return {
      job: { ...job._doc, createdAt: job._doc.createdAt.toISOString() },
      similarJobs: fetchedJobs,
    };
  }),

  // PROFILE RESOLVER
  profilePersonal: asyncHandler(async ({ userInput }, req) => {
    const {
      gender,
      title,
      ethnicity,
      firstName,
      surname,
      phoneNumber,
      citizeship,
      saId,
      dob,
      relocate,
      currCity,
      disability,
      introduction,
      email,
      profile_url,
    } = userInput;

    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userId = req.userId;
    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!userFound) {
      const error = new Error("no user found");
      error.code(404);
      throw error;
    }

    userFound.profile.personal.title = title;
    userFound.profile.personal.ethnicity = ethnicity;
    userFound.profile.personal.gender = gender;
    userFound.profile.personal.firstName = firstName;
    userFound.profile.personal.phoneNumber = phoneNumber;
    userFound.profile.personal.citizeship = citizeship;
    userFound.profile.personal.saId = saId;
    userFound.profile.personal.dob = dob;
    userFound.profile.personal.relocate = relocate;
    userFound.profile.personal.currCity = currCity;
    userFound.profile.personal.surname = surname;
    userFound.profile.personal.disability = disability;
    userFound.profile.personal.introduction = introduction;
    userFound.profile.personal.email = email;
    userFound.profile.personal.profile_url = profile_url;
    userFound.profile.personal.complete = 1;

    const updatedUser = await userFound.save();

    return {
      message: "Your personal information has been updated successfully!",
    };
  }),

  // USER PROFILE FETCH
  fetchProfile: asyncHandler(async ({ userId: id }, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userId = req.userId;
    const userInfo = id !== null ? id : userId;
    const userFound = await Users.findById(mongoose.Types.ObjectId(userInfo));

    return {
      personal: {
        gender: userFound.profile.personal.gender,
        title: userFound.profile.personal.title,
        ethnicity: userFound.profile.personal.ethnicity,
        firstName: userFound.profile.personal.firstName,
        surname: userFound.profile.personal.surname,
        phoneNumber: userFound.profile.personal.phoneNumber,
        citizeship: userFound.profile.personal.citizeship,
        saId: userFound.profile.personal.saId,
        dob: userFound.profile.personal.dob?.toISOString(),
        relocate: userFound.profile.personal.relocate,
        currCity: userFound.profile.personal.currCity,
        disability: userFound.profile.personal.disability,
        introduction: userFound.profile.personal.introduction,
        email: userFound.profile.personal.email,
        profile_url: userFound.profile.personal.profile_url,
        complete: userFound.profile.personal.complete,
      },
      experience: {
        experiences: userFound._doc.profile.experience.workExperience.map(
          (curr) => {
            return {
              ...curr._doc,
              experienceId: curr._doc._id.toString(),
              startDate: curr._doc.startDate?.toISOString(),
              endDate: curr._doc.endDate?.toISOString(),
            };
          }
        ),
        complete: userFound._doc.profile.experience.complete,
      },

      education: {
        educations: userFound._doc.profile.education.educations.map((curr) => {
          return {
            ...curr._doc,
            educationId: curr._doc._id.toString(),
          };
        }),
        complete: userFound._doc.profile.education.complete,
      },
    };
  }),

  // CREATING USER EXPERIENCE

  profileExperiece: asyncHandler(async ({ userInput }, req) => {
    const {
      jobTitle,
      companyName,
      startDate,
      endDate,
      current,
      industry,
      jobCategory,
      experienceId,
    } = userInput;

    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userId = req.userId;

    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const userExperiences = userFound._doc.profile.experience.workExperience;

    const existExperience = userExperiences.find(
      (curr) => curr._id.toString() === experienceId
    );

    const existIndex = userExperiences.indexOf(existExperience);

    if (experienceId && existExperience) {
      userFound.profile.experience.complete = 1;

      userFound._doc.profile.experience.workExperience[existIndex] = {
        jobTitle,
        companyName,
        startDate,
        endDate,
        current,
        industry,
        jobCategory,
      };

      await userFound.save();
    } else {
      userFound.profile.experience.complete = 1;

      userFound._doc.profile.experience.workExperience.push({
        jobTitle,
        companyName,
        startDate,
        endDate,
        current,
        industry,
        jobCategory,
      });

      await userFound.save();
    }

    return {
      message: "Your work experience has been updated successfully!",
    };
  }),

  // remove experience
  removeExperience: asyncHandler(async ({ userInput }, req) => {
    const { expId } = userInput;

    const userId = "60757655d7d5ff253057db40";

    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));
    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }
    const userExperiences = userFound._doc.profile.experience.workExperience;

    const newExperiences = userExperiences.filter(
      (curr) => curr._id.toString() !== expId.toString()
    );
    console.log(newExperiences);
    userFound.profile.experience.workExperience = newExperiences;
    await userFound.save();

    return {
      message: "exprerience has been deleted successfully",
    };
  }),

  // CREATING USER EDUCATION

  profileEducation: asyncHandler(async ({ userInput }, req) => {
    const { gradyear, institution, subjects, qualification, educationId } =
      userInput;

    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userId = req.userId;

    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const userEducations = userFound._doc.profile.education.educations;

    const existEducation = userEducations.find(
      (curr) => curr._id.toString() === educationId
    );

    const existIndex = userEducations.indexOf(existEducation);

    if (educationId && existEducation) {
      userFound.profile.education.complete = 1;

      userFound._doc.profile.education.educations[existIndex] = {
        gradyear,
        institution,
        subjects,
        qualification,
      };

      await userFound.save();
    } else {
      userFound.profile.education.complete = 1;

      userFound._doc.profile.education.educations.push({
        gradyear,
        institution,
        subjects,
        qualification,
      });

      await userFound.save();
    }

    return {
      message: "Your work education has been updated successfully!",
    };
  }),

  // ADD WISH LIST
  addToWishList: asyncHandler(async ({ userInput }, req) => {
    const { wishListId } = userInput;
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userId = req.userId;

    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const jobExist = userFound.wishList.indexOf(wishListId);
    let message;
    if (jobExist !== -1) {
      message = "you already added this job";
      return message;
    }

    userFound.wishList.push(wishListId);
    await userFound.save();
    message = "job added to list";
    return message;
  }),

  wishList: asyncHandler(async ({}, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userId = req.userId;

    const userFound = await Users.findById(
      mongoose.Types.ObjectId(userId)
    ).populate("wishList");

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const fetchedJobs = userFound.wishList.map((curr) => {
      return {
        title: curr.title,
        jobId: curr._id.toString(),
        createdAt: curr.createdAt.toISOString(),
        image_url: curr.image_url ? curr.image_url : "",
        location: curr.location,
        company: curr.company,
        description: curr.job_description,
      };
    });

    return fetchedJobs;
  }),

  // job application resolver
  jobApplication: asyncHandler(async ({ userInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }
    const userId = req.userId;

    const { jobId } = userInput;
    const userFound = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const jobFound = await Jobs.findById(mongoose.Types.ObjectId(jobId));

    if (!jobFound) {
      const error = new Error("this job is no longer available");
      error.code = 404;
      throw error;
    }

    const applicationFound = userFound.applications.find(
      (curr) => curr.job.toString() === jobId.toString()
    );
    let message;

    const completeness =
      +userFound.profile.personal.complete +
      +userFound.profile.experience.complete +
      +userFound.profile.education.complete;
    const isComplete = completeness !== 3 ? false : true;

    if (!isComplete) {
      message = "please complete your profile to apply for this position";
      return message;
    }

    if (applicationFound) {
      message = "you already apply for this position";
      return message;
    }

    userFound.applications.push({
      job: jobId,
      status: "In process",
      appliedAt: Date.now(),
    });

    jobFound.applicants.push(userId);

    await userFound.save();
    await jobFound.save();

    message = "Your Application has been submitted been Succesfully";
    return message;
  }),

  // fetching user applications

  userApplications: asyncHandler(async ({}, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userId = req.userId;

    const userFound = await Users.findById(
      mongoose.Types.ObjectId(userId)
    ).populate("applications.job");

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const fetchedApplications = userFound.applications.map((curr) => {
      return {
        title: curr.job.title,
        jobId: curr.job._id.toString(),
        appliedAt: curr.appliedAt.toISOString(),
        status: curr.status,
      };
    });

    return fetchedApplications;
  }),

  // fetching applicants handler

  applicants: asyncHandler(async ({ userInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userId = req.userId;

    const logedInUser = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!logedInUser.isEmployer) {
      const error = new Error("you are not authorized");
      error.code = 401;
      throw error;
    }
    const { jobId } = userInput;

    const jobFound = await Jobs.findById(
      mongoose.Types.ObjectId(jobId)
    ).populate("applicants");

    if (!jobFound) {
      const error = new Error("no job found");
      error.code = 404;
      throw error;
    }

    const fetchedApplicants = jobFound.applicants.map((curr) => {
      return {
        name: curr.name,
        email: curr.email,
        userId: curr._id.toString(),
      };
    });

    return fetchedApplicants;
  }),

  shortList: asyncHandler(async ({ userIdInput, status, jobId }, req) => {
    if (!req.isAuth) {
      const error = new Error("you are not authinthicated");
      error.code = 401;
      throw error;
    }

    const userId = req.userId;

    const logedInUser = await Users.findById(mongoose.Types.ObjectId(userId));

    if (!logedInUser.isEmployer) {
      const error = new Error("you are not authorized");
      error.code = 401;
      throw error;
    }
    const userFound = await Users.findById(
      mongoose.Types.ObjectId(userIdInput)
    );

    if (!userFound) {
      const error = new Error("no user found");
      error.code = 404;
      throw error;
    }

    const applicationFound = userFound.applications.find(
      (curr) => curr.job.toString() === jobId.toString()
    );
    const applicationIndex = userFound.applications.indexOf(applicationFound);

    userFound.applications[applicationIndex].status = status;

    await userFound.save();

    return `You have succefully ${status} this candidate`;
  }),
};

export default resolvers;
