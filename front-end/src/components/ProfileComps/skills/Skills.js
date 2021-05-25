import React from "react";
import FormContainer from "../FormContainer";

import { ListGroup } from "react-bootstrap";
import Skill from "./Skill";

const Skills = () => {
  return (
    <div className="">
      <FormContainer title="Skills" add>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Skill />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skill />
          </ListGroup.Item>
        </ListGroup>
      </FormContainer>
    </div>
  );
};

export default Skills;
