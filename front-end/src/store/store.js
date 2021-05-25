import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createJob,
  fetchEmployerJobs,
  fetchAllJobs,
  fetchSingleJob,
} from "./reducers/job";
import {
  userLogin,
  userRegiter,
  userProfile,
  fetchProfile,
  createExperience,
  createEducation,
} from "./reducers/user";
import SearchReducer from "./reducers/search";

const reducers = combineReducers({
  userLogin,
  userRegiter,
  createJob,
  fetchEmployerJobs,
  fetchAllJobs,
  fetchSingleJob,
  userProfile,
  fetchProfile,
  createExperience,
  createEducation,
  SearchReducer,
});

const localStorageUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

const initialState = {
  userLogin: {
    error: null,
    isEmployer: localStorageUser.isEmployer,
    token: localStorageUser.token,
    name: localStorageUser.name,
    email: localStorageUser.email,
  },
  fetchEmployerJobs: {
    jobs: null,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
