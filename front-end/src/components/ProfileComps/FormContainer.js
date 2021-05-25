import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

const FormContainer = ({
  title,
  children,
  edit,
  add,
  handleClick,
  handleAdd,
}) => {
  return (
    <div
      className="mt-3"
      style={{
        border: "1px solid #D8D8D8",
        position: "relative",
      }}
    >
      {edit && (
        <div
          className="d-flex align-items-center"
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            cursor: "pointer",
          }}
        >
          <EditIcon fontSize="small" />{" "}
          <span
            className="ml-1"
            style={{ fontWeight: "600", fontSize: "1.2rem" }}
            onClick={handleClick}
          >
            Edit
          </span>
        </div>
      )}

      <div
        className="title-div  d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #D8D8D8",
          height: "50px",
        }}
      >
        <h5
          className="mt-2 text-capitalize ml-2"
          style={{ fontWeight: "bold" }}
        >
          {title}
        </h5>
        {add && (
          <div
            onClick={handleAdd}
            className="d-flex align-items-center mr-2"
            style={{
              cursor: "pointer",
            }}
          >
            <AddIcon fontSize="small" />{" "}
            <span
              className="ml-1"
              style={{ fontWeight: "600", fontSize: "1.2rem" }}
            >
              Add
            </span>
          </div>
        )}
      </div>
      <div className="py-3 px-3 bg-white">{children}</div>
    </div>
  );
};

export default FormContainer;
