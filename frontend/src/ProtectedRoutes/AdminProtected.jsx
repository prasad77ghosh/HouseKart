import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = ({ isAdmin }) => {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.AuthReducer
  );
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }
  return <>{loading === false && <Outlet />}</>;
};

export default AdminProtected;
