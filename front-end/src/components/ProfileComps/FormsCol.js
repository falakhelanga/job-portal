import React from "react";

import Personal from "./personalDetails/Personal";
import EducationSection from "./education/EducationSection";

import Experience from "./workExperience/Experience";

const FormsCol = () => {
  return (
    <div className="pb-5 w-100">
      <Personal />
      <Experience />
      <EducationSection />
    </div>
  );
};

export default FormsCol;
