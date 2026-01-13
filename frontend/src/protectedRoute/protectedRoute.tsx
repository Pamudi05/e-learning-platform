// ProtectedRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null"); // assuming you store user info in localStorage

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
