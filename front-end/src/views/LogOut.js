import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/actions/user";
import { Redirect } from "react-router-dom";
function LogOut() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLogOut());
  }, [dispatch]);
  return <Redirect to="/" />;
}

export default LogOut;
