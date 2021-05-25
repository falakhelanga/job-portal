import * as constants from "../actionCreators/jobs";
import httpRequest from "../utils/httpRequest";
import {
  jobQuery,
  fetchPostGql,
  fetchAllJobsGql,
  fetchSingleJobGql,
} from "../graphql/jobGraphql";
import errorHelper from "../utils/dispatchErrorHelper";

export const createJob = (values) => async (dispatch, getState) => {
  const jobData = values;
  dispatch({
    type: constants.CREATE_JOB_INIT,
  });

  let message = null;
  const graphqlQuery = jobQuery(jobData);
  const token = getState().userLogin.token;
  try {
    const {
      data: { data },
    } = await httpRequest(graphqlQuery, token);

    message = data.createJob.message;
  } catch (error) {
    errorHelper(constants.CREATE_JOB_FAIL, error, dispatch);
  }

  dispatch({
    type: constants.CREATE_JOB_SUCC,
    message: message,
  });
};

export const fetchJobs = (page) => async (dispatch, getState) => {
  const token = getState().userLogin.token;
  const graphQlQuery = fetchPostGql(page);
  dispatch({
    type: constants.FETCH_EMPLOYER_JOBS_INIT,
  });

  try {
    const {
      data: { data },
    } = await httpRequest(graphQlQuery, token);

    const { employerPosts, totalJobs } = data.posts;

    dispatch({
      type: constants.FETCH_EMPLOYER_JOBS_SUCC,
      jobs: employerPosts,
      totalJobs: totalJobs,
    });
  } catch (error) {
    errorHelper(constants.FETCH_EMPLOYER_JOBS_FAIL, error, dispatch);
  }
};

export const fetchAllJobs = (page) => async (dispatch, getState) => {
  const graphQlQuery = fetchAllJobsGql(page);
  dispatch({
    type: constants.FETCH_ALL_JOBS_INIT,
  });

  try {
    const {
      data: { data },
    } = await httpRequest(graphQlQuery);

    const { jobPost, jobsTotal } = data.allJobsFetch;

    dispatch({
      type: constants.FETCH_ALL_JOBS_SUCC,
      jobs: jobPost,
      totalJobs: jobsTotal,
    });
  } catch (error) {
    errorHelper(constants.FETCH_ALL_JOBS_FAIL, error, dispatch);
  }
};

export const fetchSingleJob = (id) => async (dispatch) => {
  const graphQlQuery = fetchSingleJobGql(id);
  dispatch({
    type: constants.FETCH_SINGLE_JOB_INIT,
  });

  try {
    const {
      data: { data },
    } = await httpRequest(graphQlQuery);

    const { job, similarJobs } = data.fetchSingleJob;

    dispatch({
      type: constants.FETCH_SINGLE_JOB_SUCC,
      job,
      similarJobs,
    });
  } catch (error) {
    errorHelper(constants.FETCH_SINGLE_JOB_FAIL, error, dispatch);
  }
};
