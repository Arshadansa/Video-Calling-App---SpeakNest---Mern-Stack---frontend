import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/CurrentUser";

function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Not logged in
  if (!user?.data) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not onboarded
  if (!user?.data?.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  // Logged in + onboarded
  return children;
}

export default ProtectedRoute;