import { Container, Col, Row, Alert, Table } from "react-bootstrap";
import Spinner from "../components/spinner/MySpinner";
import moment from "moment";
import { useFetchApplications } from "../customHooks/useFetch";
const Applications = ({ location }) => {
  const { applications, loading, error } = useFetchApplications();
  return (
    <>
      {" "}
      <Container className="mt-5 pb-5" fluid>
        <Row
          className=" d-flex justify-content-center align-items-center "
          style={{ height: "100%" }}
        >
          <Col sm={12} md={12} lg={12}>
            {" "}
            <h3 className="mb-3">My Applications</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Spinner />}
            {applications.length > 0 ? (
              <Table striped hover responsive bordered variant="dark">
                <thead>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Job title
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Application Date
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Job Id
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((curr) => (
                    <tr key={curr.jobId}>
                      <td>{curr.title}</td>
                      <td>{moment(curr.appliedAt).fromNow()}</td>
                      <td>{curr.status}</td>
                      <td className="text-uppercase">{curr.jobId}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !loading && <h4>You have no applications!</h4>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Applications;
