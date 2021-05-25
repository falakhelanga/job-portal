import { Container, Col, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Job from "../components/SingleJobsComps/Job";
import Spinner from "../components/spinner/MySpinner";
import { useSingleJob } from "../dispatchersandselectors/allJobsDispatcher";
const SingleJob = () => {
  const { id } = useParams();

  const { job, error, loading } = useSingleJob(id);

  return (
    <Container className="mt-5 pb-5" fluid>
      <Row
        className=" d-flex justify-content-center align-items-center "
        style={{ height: "100%" }}
      >
        <Col sm={12} md={12} lg={12}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert variant="danger">
              <p>{error}</p>
            </Alert>
          ) : Object.keys(job).length !== 0 ? (
            <div>
              <Job jobId={id} />
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleJob;
