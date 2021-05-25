import React from "react";
import FormContainer from "../FormContainer";

import Education from "./Education";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Educations = ({
  showDetails,
  setShowDetails,
  setShowForm,
  setPopulatedvalues,
}) => {
  const profileState = useSelector((state) => state.fetchProfile);
  const { education } = profileState;
  const { educations } = education;

  return (
    education.complete === 1 && (
      <div className="">
        <FormContainer
          title="Education"
          add
          handleAdd={() => {
            setPopulatedvalues(null);
            setShowForm(true);
          }}
        >
          <ListGroup variant="flush">
            {education &&
              educations.length > 0 &&
              educations.map((curr) => (
                <ListGroup.Item key={curr.educationId}>
                  <Education
                    setShowForm={setShowForm}
                    setPopulatedvalues={setPopulatedvalues}
                    gradyear={curr.gradyear}
                    subjetcs={curr.subjetcs}
                    qualification={curr.qualification}
                    institution={curr.institution}
                    educationId={curr.educationId}
                  />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </FormContainer>
      </div>
    )
  );
};

export default Educations;
