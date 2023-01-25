import { Navigate } from "react-router-dom";
import useLocalStorage from "../util/hooks/useLocalStorage";

function ProtectedRoute({
  backTo,
  forAdmin = false,
  forUser = false,
  children,
}) {
  const [user] = useLocalStorage("user");

  if (
    !user ||
    (forUser && user.role === "admin") ||
    (forAdmin && user.role !== "admin")
  ) {
    return <Navigate to={backTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
