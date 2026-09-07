import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Checking your account...</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export default RequireAuth;