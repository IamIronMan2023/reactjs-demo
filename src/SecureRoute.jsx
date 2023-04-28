import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const SecureRoute = () => {
  const { isAuthenticate } = useAuth();

  return isAuthenticate ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
