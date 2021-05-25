import React from "react";
import { Button } from "react-bootstrap";

const SaveBtn = ({ isValid, children }) => {
  return (
    <>
      <Button
        className="btn-dark"
        type="submit"
        style={{ fontSize: "1.2em", fontWeight: "bold" }}
        disabled={isValid}
      >
        {children}
      </Button>
    </>
  );
};

export default SaveBtn;
