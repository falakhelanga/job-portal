import React from "react";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/" className="logo">
      <h1
        style={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        Tech
      </h1>
    </Link>
  );
};

export default Logo;
