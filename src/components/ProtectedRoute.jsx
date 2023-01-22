import { Navigate } from "react-router-dom";
import useLocalStorage from "../util/hooks/useLocalStorage";

function ProtectedRoute({ backTo, children }) {
  const [user] = useLocalStorage("user");

  if (!user) {
    return <Navigate to={backTo} replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
