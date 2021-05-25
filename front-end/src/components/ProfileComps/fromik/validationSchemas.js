import * as Yup from "yup";

export const personalSchema = Yup.object().shape({
  gender: Yup.string().required("this feild is requierd"),
  title: Yup.string().required("this feild is requierd"),

  ethnicity: Yup.string().required("this feild is requierd"),
  firstName: Yup.string().required("this feild is requierd"),
  surname: Yup.string().required("this feild is requierd"),
  phoneNumber: Yup.string()
    .required("this feild is requierd")
    .max(10, "invalid phone number"),
  citizeship: Yup.string().required("this feild is requierd"),
  saId: Yup.string()
    .required("this feild is requierd")
    .min(13, "invalid ID number")
    .max(13, "invalid ID number"),
  dob: Yup.string().required("this feild is requierd"),
  relocate: Yup.string().required("this feild is requierd"),
  currCity: Yup.string().required("this feild is requierd"),
  disability: Yup.string().required("this feild is requierd"),
  introduction: Yup.string()
    .required("this feild is requierd")
    .min(100, "Your introduction must contain atleast 100 charactors"),
  email: Yup.string().email("invalid email").required("this feild is required"),
});

export const experiencevalidation = Yup.object().shape({
  jobTitle: Yup.string().required("this feild is requierd"),
  companyName: Yup.string().required("this feild is requierd"),
  startDate: Yup.string().required("this feild is requierd"),
  endDate: Yup.string().required("this feild is requierd"),

  industry: Yup.string().required("this feild is requierd"),
  jobCategory: Yup.string().required("this feild is requierd"),
});

export const educationvalidation = Yup.object().shape({
  gradyear: Yup.string().required("this feild is requierd"),
  qualification: Yup.string().required("this feild is requierd"),
  subjects: Yup.string().required("this feild is requierd"),
  institution: Yup.string().required("this feild is requierd"),
});
