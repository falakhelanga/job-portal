import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllJobs, fetchSingleJob } from "../store/actions/job";

export const useAllJobs = (page) => {
  const allJobsState = useSelector((state) => state.fetchAllJobs);
  const { jobs, loading, error, totalJobs } = allJobsState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllJobs(+page));
  }, [dispatch, page]);

  return {
    jobs,
    loading,
    error,
    totalJobs,
  };
};

export const useSingleJob = (id) => {
  const singleJobState = useSelector((state) => state.fetchSingleJob);
  const { job, loading, error } = singleJobState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [dispatch, id]);

  return {
    job,
    loading,
    error,
  };
};
