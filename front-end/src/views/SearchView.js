import React, { useState } from "react";
import JobsPost from "../components/jobsPostsComps/JobsPost";
import Pagination from "../components/pagination/Pagination";
import Spinner from "../components/spinner/MySpinner";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { useAllJobs } from "../dispatchersandselectors/allJobsDispatcher";
import queryString from "query-string";

const SearchView = ({ history, location }) => {
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalJobs } = useAllJobs(+page);
  const parsed = queryString.parse(location.search);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredJobs = jobs?.filter(
    (curr) =>
      curr.title.toLowerCase().includes(parsed.keyword) ||
      curr.company.toLowerCase().includes(parsed.keyword) ||
      curr.location.toLowerCase().includes(parsed.keyword)
  );
  console.log(filteredJobs);
  return (
    <div>
      <Container className="mt-5" fluid>
        <Row
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <Col sm={12} md={8} lg={8}>
            {loading ? (
              <Spinner />
            ) : error ? (
              <Alert variant="danger">
                <p>{error}</p>
              </Alert>
            ) : filteredJobs.length !== 0 ? (
              filteredJobs.map((curr) => {
                return (
                  <JobsPost
                    key={curr.jobId}
                    title={curr.title}
                    image_url={curr.image_url}
                    location={curr.location}
                    company={curr.company}
                    id={curr.jobId}
                    createdAt={curr.createdAt}
                    description={curr.description}
                  />
                );
              })
            ) : filteredJobs.length === 0 ? (
              <h2>No result found </h2>
            ) : null}
            {filteredJobs.length !== 0 && !loading && (
              <div className="my-5">
                <Pagination
                  count={totalJobs}
                  page={+page}
                  handleChange={handleChange}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchView;
