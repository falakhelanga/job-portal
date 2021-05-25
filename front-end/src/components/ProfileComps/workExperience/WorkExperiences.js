import React from "react";
import FormContainer from "../FormContainer";
import WorkExperince from "./WorkExperince";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const WorkExperiences = ({
  showDetails,
  setShowDetails,
  setShowForm,
  setPopulatedvalues,
}) => {
  const profileState = useSelector((state) => state.fetchProfile);
  const { experience } = profileState;
  const { experiences } = experience;

  return (
    experience.complete === 1 && (
      <div className="">
        <FormContainer
          title="Work Experience - Add at least your most recent/current position"
          add
          handleAdd={() => {
            setPopulatedvalues(null);
            setShowForm(true);
          }}
        >
          <ListGroup variant="flush">
            {experience &&
              experiences.length > 0 &&
              experiences.map((curr) => (
                <ListGroup.Item key={curr.experienceId}>
                  <WorkExperince
                    setShowForm={setShowForm}
                    setPopulatedvalues={setPopulatedvalues}
                    jobTitle={curr.jobTitle}
                    companyName={curr.companyName}
                    startDate={new Date(curr.startDate)}
                    endDate={new Date(curr.endDate)}
                    industry={curr.industry}
                    jobCategory={curr.jobCategory}
                    experienceId={curr.experienceId}
                  />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </FormContainer>
      </div>
    )
  );
};

export default WorkExperiences;
