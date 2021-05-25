import React from "react";
import BodySection from "./BodySection";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { useJobApply } from "../../customHooks/useFetch";
import MySnackbar from "../../components/SnackBar";
import SimilarJob from "./SimilarJob";

const SingleJobBody = ({ jobId, history }) => {
  const singleJobState = useSelector((state) => state.fetchSingleJob);
  const token = useSelector((state) => state.userLogin.token);
  const isAuth = token;
  const {
    apply,
    loading: applyLoader,
    message: applyMessage,

    showSnackBar: applyShowSnackbar,
    setShowSnackBar: applySetShowSnackbar,
  } = useJobApply(jobId);
  const { job, similarJobs } = singleJobState;
  return (
    <div className="mt-3 pb-3">
      {applyMessage && (
        <MySnackbar
          severity={
            applyMessage === "you already apply for this position"
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

      {/* COMPANY DETAILS */}
      <BodySection title=" Company Profile">
        <div>
          <div
            style={{
              textAlign: "justify",
            }}
          >
            {job.company_details}
          </div>
        </div>
      </BodySection>

      {/* Job Description */}
      <BodySection title=" Description">
        <div
          style={{
            textAlign: "justify",
          }}
        >
          {job.job_description}
        </div>
      </BodySection>

      {/* Job Qualifications */}

      <BodySection title="  Qualifications">
        <div
          style={{
            textAlign: "justify",
          }}
        >
          <div className="d-flex flex-column align-items-start ml-5">
            <ul>
              {job.qualification.split(",").map((curr, index) => (
                <li key={index}>{curr}</li>
              ))}
            </ul>
          </div>
        </div>
      </BodySection>

      {/* Job Requirements */}

      <BodySection title="  job requirements">
        <div
          style={{
            textAlign: "justify",
          }}
        >
          <div className="d-flex flex-column align-items-start ml-5">
            <ul>
              {job.requirements.split(",").map((curr, index) => (
                <li key={index}>{curr}</li>
              ))}
            </ul>
          </div>
        </div>
      </BodySection>

      {/* Job benefical */}

      <BodySection title="  job benefical">
        <div
          style={{
            textAlign: "justify",
          }}
        >
          <div className="d-flex flex-column align-items-start ml-5">
            <ul>
              {job.benefical.split(",").map((curr, index) => (
                <li key={index}>{curr}</li>
              ))}
            </ul>
          </div>
        </div>
      </BodySection>
      {/* APPLY BUTTON */}
      <div className="d-flex justify-content-center">
        <div className="w-50  apply-btn mr-2 mt-3">
          <Button
            onClick={() => {
              if (!isAuth)
                return history.push(`/login/?redirect=/job/${jobId}`);
              apply(jobId);
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
      </div>

      {/* RELATED JOBS */}
      <div
        className="mt-5"
        style={{
          border: "1px solid #D8D8D8",
        }}
      >
        <div
          className="title-div  d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#f5f5f5",

            height: "30px",
          }}
        >
          <h4 className="mt-2 text-capitalize" style={{ fontWeight: "bold" }}>
            more similar jobs
          </h4>
        </div>
        {/* JOBS */}

        {similarJobs.map((curr) => (
          <SimilarJob
            key={curr.jobId}
            id={curr.jobId}
            title={curr.title}
            image={curr.image_url}
            company={curr.company}
            location={curr.location}
            createdAt={curr.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default withRouter(SingleJobBody);
