import axios from "axios";

const httpRequest = (graphQlQuery, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  return axios.post("/graphql", graphQlQuery, config);
};

export default httpRequest;
