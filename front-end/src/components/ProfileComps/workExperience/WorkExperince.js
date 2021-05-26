import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
const WorkExperince = ({
  jobTitle,
  companyName,
  startDate,
  endDate,
  industry,
  experienceId,
  jobCategory,
  setShowForm,
  setPopulatedvalues,
}) => {
  const { isEmployer } = useSelector((state) => state.userLogin);
  const handleClick = () => {
    setPopulatedvalues({
      jobTitle,
      companyName,
      startDate,
      endDate,
      industry,
      jobCategory,
      experienceId,
    });

    setShowForm(true);
  };
  return (
    <div>
      <div
        className="d-flex justify-content-between "
        style={{ position: "relative" }}
      >
        <div>
          {/* CONTENT DIV */}
          {jobTitle && (
            <h5 style={{ fontWeight: "bold" }} className="text-capitalize">
              {jobTitle}
            </h5>
          )}

          <div>
            {`${new Date(startDate).getMonth()}/${new Date(
              startDate
            ).getFullYear()} - ${new Date(endDate).getMonth()}/${new Date(
              endDate
            ).getFullYear()} `}
          </div>

          <div>{companyName}</div>

          <div>
            {industry} - {jobCategory}
          </div>
        </div>

        {/*   EDIT DIV */}
        {!isEmployer && (
          <div
            onClick={() => {
              handleClick();
            }}
            className="d-flex align-items-center"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              cursor: "pointer",
            }}
          >
            <EditIcon fontSize="small" />{" "}
            <span
              className="ml-1"
              style={{ fontWeight: "600", fontSize: "1.2rem" }}
            >
              Edit
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperince;
