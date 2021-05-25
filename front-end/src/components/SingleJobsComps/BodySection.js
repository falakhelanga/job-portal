import React from "react";

const BodySection = ({ title, children }) => {
  return (
    <div
      className="mt-3"
      style={{
        border: "1px solid #D8D8D8",
      }}
    >
      <div
        className="title-div  d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #D8D8D8",
          height: "30px",
        }}
      >
        <h4 className="mt-2 text-capitalize" style={{ fontWeight: "bold" }}>
          {title}
        </h4>
      </div>
      <div className="py-3 px-3 bg-white">{children}</div>
    </div>
  );
};

export default BodySection;
