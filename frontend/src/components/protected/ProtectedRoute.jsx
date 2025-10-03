import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

const ProtectedRoute = ({ children, admin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;

  if (admin && user?.role !== "admin")
    return <Navigate to={"/"} replace={true} />;

  return children;
};

export default ProtectedRoute;
