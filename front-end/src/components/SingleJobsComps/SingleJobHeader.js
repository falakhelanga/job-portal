import React from "react";
import { Image, Button, Spinner } from "react-bootstrap";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import MySnackbar from "../../components/SnackBar";
import { useSaveJob, useJobApply } from "../../customHooks/useFetch";
import { useSelector } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
const SingleJobHeader = ({ jobId, history }) => {
  const singleJobState = useSelector((state) => state.fetchSingleJob);
  const token = useSelector((state) => state.userLogin.token);
  const isAuth = token;
  const {
    saveJob,
    loading,
    message,

    showSnackBar,
    setShowSnackBar,
  } = useSaveJob(jobId);
  const {
    apply,
    loading: applyLoader,
    message: applyMessage,

    showSnackBar: applyShowSnackbar,
    setShowSnackBar: applySetShowSnackbar,
  } = useJobApply(jobId);
  const { job } = singleJobState;
  return (
    <div className="bg-white">
      {/* TOP DIV OF JOB HEADER */}
      <div
        className="d-flex p-2 flex-column flex-lg-row"
        style={{
          border: "1px solid #D8D8D8",
        }}
      >
        {message && (
          <MySnackbar
            severity={
              message === "you already added this job" ? "error" : "success"
            }
            showSnackBar={showSnackBar}
            setShowSnackBar={() => {
              setShowSnackBar(false);
            }}
            message={message}
          />
        )}
        {applyMessage && (
          <MySnackbar
            severity={
              applyMessage === "you already apply for this position" ||
              applyMessage ===
                "please complete your profile to apply for this position"
                ? "error"
                : "success"
            }
            showSnackBar={applyShowSnackbar}
            setShowSnackBar={() => {
              applySetShowSnackbar(false);
            }}
            message={applyMessage}
          />
        )}

        {/* IMAGE DIV */}
        {job.image_url !== "" && (
          <div className="d-flex align-items-center">
            <Image
              src={job.image_url}
              alt="job image"
              className="p-2 single-page-img"
              style={{
                border: "1px solid #f5f5f5",
                borderRadius: "5px",
              }}
            />
          </div>
        )}

        {/* TITLE ,CREATED AT AND LOCATION DIV */}
        <div className="ml-2 ">
          <h4 style={{ fontWeight: "bold" }}>{job.company}</h4>
          <h3 className="text-capitalize" style={{ fontWeight: "bold" }}>
            {job.title}
          </h3>
          <div className="d-flex flex-column flex-lg-row ">
            {/* LOCATION ICON */}
            <div className="d-flex">
              <LocationOnOutlinedIcon fontSize="small" />
              <span className="ml-2 text-capitalize">{job.location}</span>
            </div>
            {/* WORK ICON */}
            <div className="d-flex job-icon">
              <WorkOutlineOutlinedIcon fontSize="small" />
              <span className="ml-2 text-capitalize">{job.job_type}</span>
            </div>
            {/* TIME ICON */}
            <div className="d-flex job-icon">
              <ScheduleOutlinedIcon fontSize="small" />
              <span className="ml-2 text-capitalize">Full time</span>
            </div>
            {/* CREATED AT */}
            <div className="d-flex job-icon">
              <CalendarTodayOutlinedIcon fontSize="small" />
              <span className="ml-1">published:</span>
              <span className="ml-2 text-capitalize">
                {moment(job.createdAt).fromNow()}
              </span>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="btn-div d-flex w-100 flex-column flex-lg-row  mt-3">
            <div className="w-100 apply-btn mr-2">
              <Button
                onClick={() => {
                  if (!isAuth)
                    return history.push(`/login/?redirect=/job/${jobId}`);
                  apply();
                }}
                variant="dark"
                className="btn-block d-flex justify-content-center align-items-center mt-1"
              >
                {" "}
                {applyLoader ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <span style={{ fontWeight: "bold" }}>Apply Now </span>
                    <ArrowForwardIosOutlinedIcon
                      className="ml-5"
                      fontSize="small"
                    />
                  </>
                )}
              </Button>
            </div>
            <div className="w-100 apply-btn mr-2">
              <Button
                onClick={() => {
                  if (!isAuth)
                    return history.push(`/login/?redirect=/job/${jobId}`);
                  saveJob();
                }}
                style={{
                  border: "1px solid #D8D8D8",
                }}
                variant="light"
                className="btn-block d-flex justify-content-center align-items-center mt-1"
              >
                {" "}
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <span style={{ fontWeight: "bold" }}>Save this job </span>
                    <FavoriteBorderOutlinedIcon
                      className="ml-2"
                      fontSize="small"
                    />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SingleJobHeader);
