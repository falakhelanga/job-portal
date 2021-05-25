import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CompletnessCol from "../components/ProfileComps/CompletnessCol";
import FormsCol from "../components/ProfileComps/FormsCol";
import { useFetchUserProfile } from "../dispatchersandselectors/usersDispatchers";
import queryString from "query-string";

const ProfileView = ({ history, location }) => {
  const { id } = queryString.parse(location.search);
  const { error, loading } = useFetchUserProfile(history, id);
  return (
    <>
      <Container className="mt-5" fluid>
        <Row className=" d-flex  align-items-center" style={{ height: "100%" }}>
          <Col sm={12} md={12} lg={12}>
            <div className="d-flex flex-column flex-lg-row">
              <FormsCol />
              <CompletnessCol />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileView;
