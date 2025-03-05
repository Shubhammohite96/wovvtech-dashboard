import { lazy } from 'react'
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
import ExpertRating from '../pages/ExpertRating/ExpertRating';
import MonthFilterTable from '../pages/userProfile/UserOffsetData';
import BuilderShift from '../pages/BuilderShift/BuilderShift';
import WovvtechNotification from '../pages/WovvvtechNotification/WovvtechNotification';
import NotificationList from '../pages/WovvvtechNotification/NotificationList';
import TraineeList from '../pages/Training/TraineeList';
import TrainingDetails from '../pages/Training/TrainingDetails';

const DashboardPage = lazy(() => import('../pages/dashboardPage/DashboardPage'));
import DsrCardDetails from './../pages/userProfile/DsrCardDetails';
import OffsetForm from '../pages/reports/OffsetForm';
import SelfEvaluationForm from '../pages/userProfile/SelfEvaluationForm';


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
          path="/Analytics"
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
          path="/ExpertRating"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ExpertRating />
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
          path="/BuilderShift"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <BuilderShift />
            </PrivateRoute>
          }
        />

        <Route
          path="/WovvtechNotification"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <WovvtechNotification />
            </PrivateRoute>
          }
        />

        <Route
          path="/NotificationList"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <NotificationList />
            </PrivateRoute>
          }
        />

        <Route
          path="/TraineeList"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <TraineeList />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/TrainingDetails"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <TrainingDetails />
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
      </Routes>
    </Router>
  );
}

export default Routing