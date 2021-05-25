import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const Education = ({
  gradyear,
  subjects,
  institution,
  qualification,
  setShowForm,
  setPopulatedvalues,
  educationId,
}) => {
  const handleClick = () => {
    setPopulatedvalues({
      gradyear,
      subjects,
      institution,
      qualification,
      educationId,
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
          <h5 style={{ fontWeight: "bold" }} className="text-capitalize">
            {institution}
          </h5>
          <div>{gradyear}</div>
          <div>HIGHEST</div>
          <div>{qualification}</div>
        </div>

        {/*   EDIT DIV */}
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
      </div>
    </div>
  );
};

export default Education;
