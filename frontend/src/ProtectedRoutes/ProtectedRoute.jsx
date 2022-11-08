import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtrctedRoute = () => {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.AuthReducer
  );
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return <>{!loading && <Outlet />}</>;
};

export default ProtrctedRoute;
