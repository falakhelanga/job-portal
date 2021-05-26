import * as constants from "../actionCreators/user";
import {
  loginQuery,
  registerQuery,
  profileQuery,
  profileFetchQuery,
  experienceQuery,
  removeExpQuery,
  educationQuery,
} from "../graphql/userGraphql";
import errorHelper from "../utils/dispatchErrorHelper";
import httpRequest from "../utils/httpRequest";

// USER LOGIN ACTIONS

export const userlogin =
  (password, email, redirectHandler) => async (dispatch, getState) => {
    dispatch({
      type: constants.USER_LOGIN_INIT,
    });
    try {
      const graphQlQeury = loginQuery(password, email);

      const {
        data: { data },
      } = await httpRequest(graphQlQeury);

      const { userLogin } = data;

      dispatch({
        type: constants.USER_LOGIN_SUCC,
        name: userLogin.name,
        email: userLogin.email,
        token: userLogin.token,
        isEmployer: userLogin.isEmployer,
      });
      redirectHandler();
      const localStorageUserName = JSON.stringify(userLogin);
      localStorage.setItem("user", localStorageUserName);
    } catch (error) {
      errorHelper(constants.USER_LOGIN_FAIL, error, dispatch);
    }
  };

export const userLogOut = () => (dispatch) => {
  dispatch({
    type: constants.USER_LOGOUT,
  });
  const userLogin = {
    token: null,
    name: "",
    email: "",
    loading: false,
    error: "",
    isEmployer: false,
  };
  const localStorageUserName = JSON.stringify(userLogin);
  localStorage.setItem("user", localStorageUserName);
};
// USER REGISTER ACTIONS

export const userRegister =
  (name, email, password, isEmployer, redirectHandler) => async (dispatch) => {
    dispatch({
      type: constants.USER_CREATE_INIT,
    });

    try {
      const graphqlQuery = registerQuery(name, email, password, isEmployer);

      const {
        data: { data },
      } = await httpRequest(graphqlQuery);

      const { userRegister } = data;

      dispatch({
        type: constants.USER_CREATE_SUCC,
      });

      dispatch({
        type: constants.USER_LOGIN_SUCC,
        name: userRegister.name,
        email: userRegister.email,
        token: userRegister.token,
        isEmployer: userRegister.isEmployer,
      });
      redirectHandler();
      const localStorageUserName = JSON.stringify(userRegister);
      localStorage.setItem("user", localStorageUserName);
    } catch (error) {
      errorHelper(constants.USER_CREATE_FAIL, error, dispatch);
    }
  };

// PROFILE ACTIONS

export const userProfile =
  (
    profile_url,
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

    onSubmitProps,
    setShowForm,
    setShowSnackBar
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: constants.PROFILE_CREATE_INIT,
    });
    const token = getState().userLogin.token;
    try {
      const graphqlQuery = profileQuery(
        profile_url,
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
        email
      );

      const {
        data: { data },
      } = await httpRequest(graphqlQuery, token);
      setShowSnackBar(true);
      onSubmitProps.setSubmitting(false);
      setShowForm(false);

      const { profilePersonal } = data;

      dispatch({
        type: constants.PROFILE_CREATE_SUCC,
        message: profilePersonal.message,
      });

      dispatch(fetchProfile());
    } catch (error) {
      errorHelper(constants.PROFILE_CREATE_FAIL, error, dispatch);
      onSubmitProps.setSubmitting(false);
    }
  };

//  FETCH PROFILE ACTIONS

export const fetchProfile = (id) => async (dispatch, getState) => {

  dispatch({
    type: constants.PROFILE_FETCH_INIT,
  });
  const token = getState().userLogin.token;
  try {
    const graphqlQuery = profileFetchQuery(id);

    const {
      data: { data },
    } = await httpRequest(graphqlQuery, token);

    const { fetchProfile } = data;
 

    dispatch({
      type: constants.PROFILE_FETCH_SUCC,
      personal: fetchProfile.personal,
      experience: {
        experiences: fetchProfile.experience.experiences,
        complete: fetchProfile.experience.complete,
      },
      education: {
        educations: fetchProfile.education.educations,
        complete: fetchProfile.education.complete,
      },
    });
  } catch (error) {
    errorHelper(constants.PROFILE_FETCH_FAIL, error, dispatch);
  }
};

// CREATE EXPERIENCE ACTIONS

export const createExperience =
  (
    jobTitle,
    companyName,
    startDate,
    endDate,
    current,
    industry,
    jobCategory,
    experienceId,
    onSubmitProps,
    setShowForm,
    setShowSnackBar
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: constants.EXPERIENCE_CREATE_INIT,
    });
    const token = getState().userLogin.token;
    try {
      const graphqlQuery = experienceQuery(
        jobTitle,
        companyName,
        startDate,
        endDate,
        current,
        industry,
        jobCategory,
        experienceId
      );

      const {
        data: { data },
      } = await httpRequest(graphqlQuery, token);
      setShowSnackBar(true);
      onSubmitProps.setSubmitting(false);
      setShowForm(false);

      const { profileExperiece } = data;

      dispatch({
        type: constants.EXPERIENCE_CREATE_SUCC,
        message: profileExperiece.message,
      });

      dispatch(fetchProfile());
    } catch (error) {
      errorHelper(constants.EXPERIENCE_CREATE_FAIL, error, dispatch);
      onSubmitProps.setSubmitting(false);
    }
  };

// REMOVE EXPERIENCE

export const removeExperience =
  (
    id,
    setShowSnackBar,

    setShowForm
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: constants.EXPERIENCE_REMOVE_INIT,
    });
    const token = getState().userLogin.token;
    try {
      const graphqlQuery = removeExpQuery(id);

      const {
        data: { data },
      } = await httpRequest(graphqlQuery, token);
      setShowSnackBar(true);

      setShowForm(false);

      const { removeExperience } = data;

      dispatch({
        type: constants.EXPERIENCE_REMOVE_SUCC,
        message: removeExperience.message,
      });

      dispatch(fetchProfile());
    } catch (error) {
      errorHelper(constants.EXPERIENCE_REMOVE_FAIL, error, dispatch);
    }
  };

// CREATE EDUCATION ACTIONS

export const createEducation =
  (
    gradyear,
    institution,
    subjects,
    qualification,
    educationId,
    onSubmitProps,
    setShowForm,
    setShowSnackBar
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: constants.EDUCATION_CREATE_INIT,
    });
    const token = getState().userLogin.token;
    try {
      const graphqlQuery = educationQuery(
        gradyear,
        institution,
        subjects,
        qualification,
        educationId
      );

      const {
        data: { data },
      } = await httpRequest(graphqlQuery, token);
      setShowSnackBar(true);
      onSubmitProps.setSubmitting(false);
      setShowForm(false);

      const { profileEducation } = data;

      dispatch({
        type: constants.EDUCATION_CREATE_SUCC,
        message: profileEducation.message,
      });

      dispatch(fetchProfile());
    } catch (error) {
      errorHelper(constants.EDUCATION_CREATE_FAIL, error, dispatch);
      onSubmitProps.setSubmitting(false);
    }
  };
