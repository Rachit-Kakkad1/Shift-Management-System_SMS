import { BrowserRouter, Route, Routes } from "react-router";
import UserProvider from "../context/UserContext";
import Login from "../pages/Login";
import Root from "../pages/Root";
import Dashboard from "../pages/Admin/Dashboard";
import CreateUsers from "../pages/Admin/CreateUser";
import ManageUsers from "../pages/Admin/ManageUsers";
import EditUser from "../pages/Admin/EditUser";
import CreateShifts from "../pages/Admin/CreateShifts";
import UserDashboard from "../pages/User/UserDashboard";
import ViewStatistics from "../pages/User/ViewStatistics";
import ChangePassword from "../pages/User/ChangePassword";
import AdminStatistics from "../pages/Admin/AdminStatistics";
import AuditLogs from "../pages/Admin/AuditLogs";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../components/AdminLayout";
import DashboardLayout from "../components/DashboardLayout";
import Passcode from "../pages/Passcode";
import Profile from "../pages/Profile";
import { Toaster } from "react-hot-toast";

const AppRouter = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passcode" element={<Passcode />} />

          {/* Admin Route */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/create-shifts" element={<CreateShifts />} />
              <Route path="/admin/create-user" element={<CreateUsers />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/users/:id" element={<EditUser />} />
              <Route path="/admin/statistics" element={<AdminStatistics />} />
              <Route path="/admin/logs" element={<AuditLogs />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* User Route */}
          <Route element={<PrivateRoute allowedRoles={["employee"]} />}>
            <Route element={<DashboardLayout />}>
               <Route path="/user/dashboard" element={<UserDashboard />} />
               <Route path="/user/statistics" element={<ViewStatistics />} />
               <Route path="/user/change-password" element={<ChangePassword />} />
               <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </UserProvider>
  );
};

export default AppRouter;
