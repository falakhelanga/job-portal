import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../store/actions/user";

export const useFetchUserProfile = (history, id) => {
  const token = useSelector((state) => state.userLogin.token);
  const isAuth = token !== null;
  const profileState = useSelector((state) => state.fetchProfile);
  const { loading, error, personal } = profileState;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuth) return history.push("/login");
    dispatch(fetchProfile(id));
  }, [dispatch, isAuth, history, id]);

  return {
    loading,
    error,
    personal,
  };
};
