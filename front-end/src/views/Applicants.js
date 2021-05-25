import { Container, Col, Row, Alert, Table } from "react-bootstrap";
import Spinner from "../components/spinner/MySpinner";
import queryString from "query-string";
import { useFetchApplicants } from "../customHooks/useFetch";

const Applicants = ({ location, history }) => {
  const { title, jobId } = queryString.parse(location.search);

  const { applicants, loading, error } = useFetchApplicants(jobId);
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
            <h3 className="mb-3">Applicants for {title} position</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Spinner />}
            {applicants.length > 0 ? (
              <Table striped hover responsive bordered variant="dark">
                <thead>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      ID
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((curr) => (
                    <tr key={curr.userId}>
                      <td>{curr.name}</td>
                      <td>{curr.email}</td>
                      <td
                        className="text-uppercase"
                        onClick={() => {
                          history.push(`/profile/?id=${curr.userId}`);
                        }}
                      >
                        {curr.userId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !loading && <h4>You have no applicants yet!</h4>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Applicants;
