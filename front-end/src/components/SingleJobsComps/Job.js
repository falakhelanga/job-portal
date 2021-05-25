import SingleJobBody from "./SingleJobBody";
import SingleJobHeader from "./SingleJobHeader";

import { Row, Col } from "react-bootstrap";

const Job = ({ jobId }) => {
  return (
    <Row className="  w-100 d-flex justify-content-center">
      <Col lg={8}>
        <div className=" p-2 ">
          {/* JOB HEADER */}
          <SingleJobHeader jobId={jobId} />

          {/* JOB BODY */}
          <SingleJobBody jobId={jobId} />
        </div>
      </Col>
    </Row>
  );
};

export default Job;
