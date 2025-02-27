import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { roleConfig } from '../config/roleConfig';
import LoginPage from '../pages/loginPage/LoginPage';
import UserProfile from '../pages/userProfile/UserProfile';
import DsrReport from '../pages/reports/DsrReport';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import WeeklyDataForm from '../pages/reports/WeeklyDataForm';
import UploadCsv from '../pages/UploadCsv/UploadCsv';
import Analytics from '../pages/Analytics/Analytics';
import BuilderTickets from '../pages/reports/BuilderTickets';
import BuilderAnnouncement from '../pages/reports/BuilderAnnouncement';
import MonthFilterTable from '../pages/userProfile/UserOffsetData';

const DashboardPage = lazy(() => import('../pages/dashboardPage/DashboardPage'));
import DsrCardDetails from './../pages/userProfile/DsrCardDetails';
import OffsetForm from '../pages/reports/OffsetForm';
import SelfEvaluationForm from './../pages/userProfile/SelfEvaluationForm';
import FileZilla from './../pages/dashboardPage/FileZilla';


function Routing() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={roleConfig.dashboard}>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Private Routes without Sidebar */}
        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <h1>setting page</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/DsrReport"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DsrReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/WeeklyFormData"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <WeeklyDataForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/OffsetForm"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <OffsetForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/UploadCsv"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UploadCsv />
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Analytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/BuilderTickets"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <BuilderTickets />
            </PrivateRoute>
          }
        />

        <Route
          path="/BuilderAnnouncement"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <BuilderAnnouncement />
            </PrivateRoute>
          }
        />

        <Route
          path="/MonthFilterTable"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <MonthFilterTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/DsrCardDetails"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DsrCardDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/SelfEvaluationForm"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <SelfEvaluationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/FileZilla"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <FileZilla />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/filezilla"
          element={
            <AuthGuard>
              <MainLayout>
                <FileZilla />
              </MainLayout>
            </AuthGuard>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default Routing