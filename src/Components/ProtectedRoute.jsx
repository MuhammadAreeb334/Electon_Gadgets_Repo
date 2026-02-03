import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, isLoggedIn } = useSelector((state) => state.user);
  const authToken=localStorage.getItem('token')
  const checkUser= JSON.parse(localStorage.getItem('user'))
  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  console.log(checkUser.role,'jgdjgagsdgsaj')
  console.log(allowedRoles,'kjsdakjdhk')
  if (allowedRoles && !allowedRoles.includes(checkUser.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
