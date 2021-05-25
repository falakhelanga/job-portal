import { buildSchema } from "graphql";

const schemaBuild = buildSchema(`

    input userIdInput {
        jobId: String
    }
    input applicationInput {
        jobId: String!
    }

    input wishListInput {
        wishListId: ID!
    }
    input educationInput {
        gradyear: String
        subjects: String
        institution: String
        educationId: String
        qualification: String
    }

    input experienceInput {
        jobTitle: String
        companyName: String
        startDate: String
        endDate: String
        current: Boolean
        industry: String
        jobCategory: String
        experienceId: String
    }

input expeId {
    expId: String!
}
 input profilePersonalInput {
gender: String,
  title: String,
  ethnicity: String
  firstName: String
  surname: String
  phoneNumber: String
  citizeship: String
  saId: String
  dob: String
  relocate: String
  currCity: String
  disability: String
  introduction: String
  email: String,
  profile_url: String
  complete: Int
 }

 type profilePersonalOutPut {
gender: String,
  title: String,
  ethnicity: String
  firstName: String
  surname: String
  phoneNumber: String
  citizeship: String
  saId: String
  dob: String
  relocate: String
  currCity: String
  disability: String
  introduction: String
  email: String,
  profile_url: String
  complete: Int
 }

 type profileExpOutPutArr {
        jobTitle: String
        companyName: String
        startDate: String
        endDate: String
        current: Boolean
        industry: String
        jobCategory: String
        experienceId: String
 }

  type profileEdOutPut {
        gradyear: String
        subjects: String
        institution: String
        educationId: String
        qualification: String
    }

 type profileExpOutPut {
    experiences : [profileExpOutPutArr]
    complete: Int
 }
 type profileExpEducation {
     educations: [profileEdOutPut]
     complete: Int
 }
type fetchedProfile {
    personal : profilePersonalOutPut
    experience: profileExpOutPut
    education : profileExpEducation
}
type user {
    name: String!
    email: String!
    token: String!
    isEmployer: Boolean!
    
}

input userInputData {
    email: String!
    name: String!
    password: String!
    isEmployer: Boolean
}
input loginInputData {
    email: String!
 
    password: String!
  
}

type employerPosts {
title:String!
sectors: String!
createdAt: String!
_id: ID!
applicants: [String!]

}

input jobInputData {
    title: String!
    company: String!
   image_url: String
    location: String!
    salary: Int!
    job_type: String!
    company_details: String!
    job_description: String!
    qualification: String!
    requirements: String!
    benefical: String!
    sectors: String!
}

type job {
     title: String!
    company: String!
   image_url: String
    location: String!
    salary: Int!
    job_type: String!
    company_details: String!
    job_description: String!
    qualification: String!
    requirements: String!
    benefical: String!
    sectors: String!
    createdAt: String!
}


type jobCreatedFeedback {
     message:String!
}
type messageFeedback {
     message:String!
}

input posterId {
postId:ID!
}

input postInputData {
    page:Int!
}
type postsReturn {
employerPosts: [employerPosts!]
 totalJobs: Int
}

type  jobPost {
    jobId: ID!
    title: String!
    image_url : String!
    company: String!
    location: String!
    createdAt: String!
    description: String!
}

type singleJob {
    job : job!
    similarJobs : [jobPost]!
}
type fetchedJobs  {
   jobPost: [jobPost]!
    jobsTotal : Int!
}


type fetchApplications {
    title: String!
    jobId: String!
    appliedAt: String!
    status: String!
}

type fetchedApplicants {
    name: String!
    email : String!
    userId : String!
}
type rootQuery {
    userLogin(userInput:loginInputData): user!
    posts(postInput:postInputData): postsReturn!
    allJobsFetch(pagenumber:postInputData): fetchedJobs
    fetchSingleJob(jobId:posterId): singleJob!
    fetchProfile(userId: String): fetchedProfile
    wishList: [jobPost]!
    userApplications: [fetchApplications]!
    applicants(userInput: userIdInput): [fetchedApplicants]!

 
    
  
  
}

type rootMutation {
    userRegister(userInput:userInputData): user!
    createJob(jobInput:jobInputData): jobCreatedFeedback!
    postDelete(posterInput:posterId):messageFeedback!
    profilePersonal(userInput: profilePersonalInput ):messageFeedback!
    profileExperiece(userInput: experienceInput): messageFeedback!
    profileEducation(userInput: educationInput): messageFeedback!
    removeExperience(userInput: expeId) : messageFeedback!
    addToWishList(userInput:wishListInput) : String
    jobApplication(userInput:applicationInput) : String
    shortList( userIdInput: String! status: String! jobId: String) : String
    
}

schema {
    query: rootQuery
    mutation: rootMutation
}
`);

export default schemaBuild;
