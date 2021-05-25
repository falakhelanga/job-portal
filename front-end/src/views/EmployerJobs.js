import { Container, Table, Alert, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJobs } from "../store/actions/job";
import MySpinner from "../components/spinner/MySpinner";
import httpRequest from "../store/utils/httpRequest";
import { deleteJob } from "../store/graphql/jobGraphql";
import AddIcon from "@material-ui/icons/Add";
import queryString from "query-string";
import MyPagination from "../components/pagination/Pagination";

const EmployerJobs = ({ history, location }) => {
  const dispatch = useDispatch();
  const jobsState = useSelector((state) => state.fetchEmployerJobs);
  const loginState = useSelector((state) => state.userLogin);
  const { token } = loginState;
  const { error, loading, jobs, totalJobs } = jobsState;
  const [deleteMessage, setDeleteMesage] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const { page } = queryString.parse(location.search);

  const handleChange = (event, value) => {
    history.push(`?page=${value}`);
  };

  useEffect(() => {
    const fetching = () => {
      dispatch(fetchJobs(+page));
    };

    fetching();
  }, [dispatch, page]);

  useEffect(() => {
    const fetching = () => {
      if (fetchAgain) {
        dispatch(fetchJobs(+page));
      }
    };
    fetching();
  }, [dispatch, setFetchAgain, fetchAgain, page]);

  const handleDelete = async (id) => {
    console.log(id);
    const graphQlQuery = deleteJob(id);
    let message = null;
    try {
      const {
        data: { data },
      } = await httpRequest(graphQlQuery, token);
      message = data.postDelete.message;
    } catch (error) {}
    history.push(`employerjobs/?page=1`);
    setFetchAgain(true);

    setDeleteMesage(message);
    console.log(message);
  };
  return (
    <div>
      <Container className="mt-3" fluid>
        <div className=" d-flex justify-content-between w-100 mb-3">
          <h1 className="text-capitalize text-center">my posts</h1>
          <Button
            variant="dark"
            style={{ fontWeight: "bold", height: "40px" }}
            onClick={() => {
              history.push("/jobcreate");
            }}
          >
            Create new Post <AddIcon />
          </Button>
        </div>

        {error && (
          <Alert variant="danger" dismissible className="mt-2">
            <p>{error}</p>
          </Alert>
        )}
        {deleteMessage && (
          <Alert variant="success" dismissible className="mt-2">
            <p>{deleteMessage}</p>
          </Alert>
        )}
        {loading ? (
          <MySpinner />
        ) : jobs && jobs?.length > 0 ? (
          <>
            <Table striped hover responsive bordered variant="dark">
              <thead>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Title
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Sector
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Date Posted
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    No of Applicants
                  </td>
                </tr>
              </thead>
              <tbody>
                {jobs.map((curr) => {
                  return (
                    <tr key={curr._id}>
                      <td
                        className="job-details"
                        onClick={() => {
                          history.push(`/job/${curr._id}`);
                        }}
                      >
                        {curr.title}
                      </td>
                      <td>{curr.sectors}</td>
                      <td>{new Date(curr.createdAt).toLocaleDateString()}</td>

                      <td
                        className="applicants-td"
                        onClick={() => {
                          history.push(
                            `/applicants/?title=${curr.title}&jobId=${curr._id}`
                          );
                        }}
                      >
                        {curr.applicants?.length}
                      </td>

                      <td>
                        <DeleteIcon
                          onClick={() => {
                            handleDelete(curr._id);
                          }}
                          className=" text-danger"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="my-5">
              <MyPagination
                handleChange={handleChange}
                page={+page}
                count={totalJobs}
              />
            </div>
          </>
        ) : (
          <Container>
            <h3>You have no Posts, Please create new post</h3>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default EmployerJobs;
