import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const Skill = () => {
  return (
    <div>
      <div
        className="d-flex justify-content-between "
        style={{ position: "relative" }}
      >
        <div>
          {/* CONTENT DIV */}
          <h6 style={{ fontWeight: "bold" }} className="text-capitalize">
            JavaScript
          </h6>
        </div>

        {/*   EDIT DIV */}
        <div
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

export default Skill;
