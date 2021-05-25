import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormContainer from "../FormContainer";
import CheckIcon from "@material-ui/icons/Check";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

const Progress = () => {
  const profileState = useSelector((state) => state.fetchProfile);

  const { experience, personal, education } = profileState;

  const compPercent =
    ((+experience?.complete + +personal?.complete + +education?.complete) / 3) *
    100;
  const completeTotal = experience || personal || education ? compPercent : 0;

  return (
    <div className="d-none d-lg-block">
      <FormContainer title="profile complitness ">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div
              className="d-flex align-items-center py-5"
              style={{ position: "relative" }}
            >
              <CircularProgress
                variant="determinate"
                className="mr-4 text-dark"
                value={completeTotal}
                style={{ width: "120px" }}
              />
              <h1
                style={{
                  fontWeight: "bold",
                  position: "absolute",
                  left: "65px",
                }}
              >
                {!isNaN(Math.ceil(completeTotal)) &&
                  `${Math.ceil(completeTotal)}%`}
              </h1>

              <span
                className="ml-4"
                style={{ fontweight: "bolder", fontSize: "1.2rem" }}
              >
                {" "}
                {completeTotal !== 100
                  ? "Your profile is not complete!"
                  : "Your profile is complete!"}
              </span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5 style={{ fontWeight: "bolder" }}>Why do we need your CV ?</h5>
            <div className="d-flex align-items-center">
              <CheckIcon fontSize="small" style={{ fontWeight: "900" }} />{" "}
              <span className="ml-2">More relevant job offers</span>
            </div>
            <div className="d-flex align-items-center mt-1">
              <CheckIcon fontSize="small" style={{ fontWeight: "900" }} />{" "}
              <span className="ml-2">
                Recruiters can find you in CV searches
              </span>
            </div>
            <div className="d-flex align-items-center mt-1">
              <CheckIcon fontSize="small" style={{ fontWeight: "900" }} />{" "}
              <span className="ml-2">Faster application process</span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </FormContainer>
    </div>
  );
};

export default Progress;
