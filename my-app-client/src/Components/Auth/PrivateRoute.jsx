import { Navigate, useLocation } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import useAuthStore from "../../features/auth/stores/authStore";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  
  const role = user?.user?.role;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="text-center justify-center items-center">
        <Button>
          <Spinner aria-label="Spinner button example" size="sm" />
          <span className="pl-3">Loading...</span>
        </Button>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
