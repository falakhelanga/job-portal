import * as constants from "../actionCreators/user";
import reducerState from "../utils/reducerState";

const removeExpState = {
  loading: false,
  error: null,
  message: null,
};

const userLoginInitState = {
  isEmployer: false,
  token: null,
  name: "",
  email: "",
  loading: false,
  error: null,
};

const userRegisterInitState = {
  loading: false,
  error: null,
};

const userProfileInitState = {
  loading: false,
  error: null,
  message: null,
};

const createExpirienceInitState = {
  loading: false,
  error: null,
  message: null,
};

const createEducationInitState = {
  loading: false,
  error: null,
  message: null,
};

const userProfileFetchInitState = {
  loading: false,
  error: null,
  personal: {},
  experience: {
    experiences: [],
    complete: 0,
  },
  education: {
    education: [],
    complete: 0,
  },
};
export const userLogin = (state = userLoginInitState, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_INIT:
      return reducerState({ state }, { loading: true });
    case constants.USER_LOGIN_SUCC:
      return reducerState(
        { ...state },
        {
          loading: false,
          name: action.name,
          email: action.email,
          token: action.token,
          isEmployer: action.isEmployer,
        }
      );

    case constants.USER_LOGIN_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    case constants.USER_LOGOUT:
      return reducerState(
        { ...state },
        {
          token: null,
          name: "",
          email: "",
          loading: false,
          error: "",
          isEmployer: false,
        }
      );

    default:
      return state;
  }
};

export const userRegiter = (state = userRegisterInitState, action) => {
  switch (action.type) {
    case constants.USER_CREATE_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.USER_CREATE_SUCC:
      return reducerState({ ...state }, { loading: false });
    case constants.USER_CREATE_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const userProfile = (state = userProfileInitState, action) => {
  switch (action.type) {
    case constants.PROFILE_CREATE_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.PROFILE_CREATE_SUCC:
      return reducerState(
        { ...state },
        { loading: false, message: action.message }
      );
    case constants.PROFILE_CREATE_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const fetchProfile = (state = userProfileFetchInitState, action) => {
  switch (action.type) {
    case constants.PROFILE_FETCH_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.PROFILE_FETCH_SUCC:
      return reducerState(
        { ...state },
        {
          loading: false,
          personal: action.personal,
          experience: action.experience,
          education: action.education,
        }
      );
    case constants.PROFILE_FETCH_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const createExperience = (state = createExpirienceInitState, action) => {
  switch (action.type) {
    case constants.EXPERIENCE_CREATE_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.EXPERIENCE_CREATE_SUCC:
      return reducerState(
        { ...state },
        { loading: false, message: action.message }
      );
    case constants.EXPERIENCE_CREATE_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const removeExperience = (state = removeExpState, action) => {
  switch (action.type) {
    case constants.EXPERIENCE_REMOVE_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.EXPERIENCE_REMOVE_SUCC:
      return reducerState(
        { ...state },
        { loading: false, message: action.message }
      );
    case constants.EXPERIENCE_REMOVE_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const createEducation = (state = createEducationInitState, action) => {
  switch (action.type) {
    case constants.EDUCATION_CREATE_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.EDUCATION_CREATE_SUCC:
      return reducerState(
        { ...state },
        { loading: false, message: action.message }
      );
    case constants.EDUCATION_CREATE_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};
