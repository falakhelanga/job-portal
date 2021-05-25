import { Container, Col, Row } from "react-bootstrap";
import Job from "../components/SingleJobsComps/SimilarJob";
import { useFetchWishList } from "../customHooks/useFetch";
import Spinner from "../components/spinner/MySpinner";
import { Alert } from "react-bootstrap";
import moment from "moment";

const WishList = () => {
  const { loading, wishList: list, error } = useFetchWishList();

  return (
    <Container className="mt-5 pb-5" fluid>
      {error && (
        <Alert variant="danger" dismissible>
          <p>{error}</p>
        </Alert>
      )}
      {loading && <Spinner />}
      {list?.length !== 0 ? (
        <Row
          className=" d-flex justify-content-center align-items-center "
          style={{ height: "100%" }}
        >
          <Col sm={12} md={12} lg={8}>
            <h3>My Jobs</h3>
            {list?.map((curr) => (
              <Job
                key={curr.jobId}
                id={curr.jobId}
                title={curr.title}
                image={curr.image_url}
                company={curr.company}
                location={curr.location}
                createdAt={curr.createdAt}
              />
            ))}
          </Col>
        </Row>
      ) : (
        !loading && <h3>No Jobs added to your list!</h3>
      )}
    </Container>
  );
};
export default WishList;
