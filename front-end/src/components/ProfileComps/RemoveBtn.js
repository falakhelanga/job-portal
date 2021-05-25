import React from "react";
import { Button } from "react-bootstrap";

const RemoveBtn = ({ removeHandler, children }) => {
  return (
    <>
      <Button
        className=" ml-2"
        variant="light"
        type="btn"
        style={{
          fontSize: "1.2em",
          border: "1px solid #D8D8D8",
          fontWeight: "bold",
        }}
        onClick={removeHandler}
      >
        {children}
      </Button>
    </>
  );
};

export default RemoveBtn;
