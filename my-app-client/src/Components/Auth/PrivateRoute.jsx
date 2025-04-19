import { Navigate, useLocation } from 'react-router-dom';
import { Button, Spinner } from "flowbite-react";
import useAuthStore from '../../features/auth/stores/authStore';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuthStore();
  const location = useLocation();
  

  if(loading){
    return <div className='text-center justify-center items-center'>
       <Button>
        <Spinner aria-label="Spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  }
  if(user){
    return children;
  }

  return (
    <Navigate to="/login" state={{from: location}} replace></Navigate>
  )
}

export default PrivateRoute