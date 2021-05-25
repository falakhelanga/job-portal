import * as constants from "../actionCreators/jobs";
import reducerState from "../utils/reducerState";

const initState = {
  loading: false,
  error: null,
  message: null,
};

const employerJobsInit = {
  loading: false,
  error: null,
  jobs: null,
  totalJobs: 0,
};

const allJobsInit = {
  jobs: [],
  loading: false,
  error: null,
  totalJobs: 0,
};

const singleJobInit = {
  job: {},
  similarJobs: [],
  loading: false,
  error: null,
};
export const createJob = (state = initState, action) => {
  switch (action.type) {
    case constants.CREATE_JOB_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.CREATE_JOB_SUCC:
      return reducerState(
        { ...state },
        { loading: false, message: action.message }
      );
    case constants.CREATE_JOB_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );

    default:
      return state;
  }
};

export const fetchEmployerJobs = (state = employerJobsInit, action) => {
  switch (action.type) {
    case constants.FETCH_EMPLOYER_JOBS_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.FETCH_EMPLOYER_JOBS_SUCC:
      return reducerState(
        { ...state },
        { loading: false, jobs: action.jobs, totalJobs: action.totalJobs }
      );
    case constants.FETCH_EMPLOYER_JOBS_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );
    default:
      return state;
  }
};

export const fetchAllJobs = (state = allJobsInit, action) => {
  switch (action.type) {
    case constants.FETCH_ALL_JOBS_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.FETCH_ALL_JOBS_SUCC:
      return reducerState(
        { ...state },
        {
          loading: false,
          jobs: action.jobs,
          totalJobs: action.totalJobs,
        }
      );
    case constants.FETCH_ALL_JOBS_FAIL:
      return reducerState(
        { ...state },
        { laoding: false, error: action.error }
      );
    default:
      return state;
  }
};

export const fetchSingleJob = (state = singleJobInit, action) => {
  switch (action.type) {
    case constants.FETCH_SINGLE_JOB_INIT:
      return reducerState({ ...state }, { loading: true });
    case constants.FETCH_SINGLE_JOB_SUCC:
      return reducerState(
        { ...state },
        { loading: false, job: action.job, similarJobs: action.similarJobs }
      );
    case constants.FETCH_SINGLE_JOB_FAIL:
      return reducerState(
        { ...state },
        { loading: false, error: action.error }
      );
    default:
      return state;
  }
};
