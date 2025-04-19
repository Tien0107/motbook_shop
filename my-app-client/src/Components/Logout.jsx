
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../features/auth/stores/authStore';

const Logout = () => {
  const {logout} = useAuthStore()
  const location = useLocation();
  const navigate = useNavigate();

  
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
      <button className='bg-blue-600 rounded text-white px-8 py-2' >Log Out</button>
    </div>
  )
}

export default Logout