import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const authState = useAuth();
  return authState.token ? children : <Navigate to="/login" />;
};
