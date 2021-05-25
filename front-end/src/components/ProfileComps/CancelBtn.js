import React from "react";
import { Button } from "react-bootstrap";

const CancelBtn = ({ handleClick }) => {
  return (
    <>
      <Button
        className="btn-light ml-2"
        type="button"
        style={{ fontSize: "1.2em", color: "red", fontWeight: "bold" }}
        onClick={handleClick}
      >
        Cancel
      </Button>
    </>
  );
};

export default CancelBtn;
