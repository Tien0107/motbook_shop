import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../features/auth/stores/authStore';

const Logout = () => {
  const {logout} = useAuthStore()
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
const handleLogout = () => {
    logout()
    navigate(from, { replace: true });
  }
  
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
      <button onClick={handleLogout} className='bg-blue-600 rounded text-white px-8 py-2' >Log Out</button>
    </div>
  );
};

export default Logout;
