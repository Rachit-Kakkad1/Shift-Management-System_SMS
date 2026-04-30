import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  } else {
    // If user is logged in but trying to access a role-restricted page they don't have access to
    const fallbackPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={fallbackPath} replace />;
  }
};

export default PrivateRoute;
