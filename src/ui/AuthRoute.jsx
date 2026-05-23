import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/CurrentUser";

function AuthRoute({ children }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // If user already onboarded → go home
  if (user?.data?.isOnboarded) {
    return <Navigate to="/" replace />;
  }

  // If logged in but not onboarded → go onboarding
  if (user?.data && !user?.data?.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  // If not logged in → allow login/signup
  return children;
}

export default AuthRoute;