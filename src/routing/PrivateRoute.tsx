import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "../Utils/authUtils";
import Layout from "./Layout";

interface PrivateRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; // Define the type for children
  showSidebar?: boolean; // Sidebar visibility control
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children, showSidebar = true  }) => {
  const { token, userRole } = getAuthData();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole || "")) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <>
    <Layout showSidebar={showSidebar}>
      {children ? <>{children}</> : <Outlet />}
      </Layout>
    </>
  );
};

export default PrivateRoute;
