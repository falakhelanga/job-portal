import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

// fetching wishlist hook
export const useFetchWishList = () => {
  const token = useSelector((state) => state.userLogin.token);
  const [wishList, setWishList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const fetchQuery = {
    query: `  query {
         wishList {
                      title,
                      jobId,
                      createdAt,
                      image_url,
                      location,
                      company,
                      description
                  }
              }

   `,
  };

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await axios.post("/graphql", fetchQuery, config);

        setWishList(data?.wishList);
        setLoading(false);
      } catch (err) {
        setError(err.response.data?.message[0]);
        setLoading(false);
      }
    };
    fetching();
    // eslint-disable-next-line
  }, []);

  return {
    wishList,
    error,
    loading,
  };
};

// add to wishlist hook
export const useSaveJob = (id) => {
  const token = useSelector((state) => state.userLogin.token);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const saveJobQuery = {
    query: `  mutation {
          addToWishList(userInput:{wishListId:"${id}"})

              }

   `,
  };

  const saveJob = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/graphql", saveJobQuery, config);
      setLoading(false);
      setMessage(data.addToWishList);
      setShowSnackBar(true);
    } catch (err) {
      setError(err.response.data?.message[0]);
      setLoading(false);
    }
  };

  return {
    message,
    error,
    loading,
    saveJob,
    setShowSnackBar,
    showSnackBar,
  };
};

// apply for the job hook
export const useJobApply = (id) => {
  const token = useSelector((state) => state.userLogin.token);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const saveJobQuery = {
    query: `  mutation {
          jobApplication(userInput:{jobId:"${id}"})

              }

   `,
  };

  const apply = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/graphql", saveJobQuery, config);
      setLoading(false);
      setMessage(data.jobApplication);
      setShowSnackBar(true);
    } catch (err) {
      setError(err.response.data?.message[0]);
      setLoading(false);
    }
  };

  return {
    message,
    error,
    loading,
    apply,
    setShowSnackBar,
    showSnackBar,
  };
};

// fetching applicants hook
export const useFetchApplicants = (id) => {
  const token = useSelector((state) => state.userLogin.token);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const fetchQuery = {
    query: `  query {
         applicants(userInput:{jobId: "${id}"}) {
                      name,
                      email,
                      userId
                  }
              }

   `,
  };

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await axios.post("/graphql", fetchQuery, config);

        setApplicants(data?.applicants);
        setLoading(false);
      } catch (err) {
        setError(err.response.data?.message[0]);
        setLoading(false);
      }
    };
    fetching();
    // eslint-disable-next-line
  }, []);

  return {
    applicants,
    error,
    loading,
  };
};

// fetching user applications hook

export const useFetchApplications = () => {
  const token = useSelector((state) => state.userLogin.token);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const fetchQuery = {
    query: `  query {
         userApplications {
                      title,
                      appliedAt,
                      jobId,
                      status
                  }
              }

   `,
  };

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await axios.post("/graphql", fetchQuery, config);

        setApplications(data?.userApplications);
        setLoading(false);
      } catch (err) {
        setError(err.response.data?.message[0]);
        setLoading(false);
      }
    };
    fetching();
    // eslint-disable-next-line
  }, []);

  return {
    applications,
    error,
    loading,
  };
};
