import { useContext, useEffect } from 'react';
import { AuthContext } from '../contects/AuthProider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout(); // Gọi hàm logout từ context
        alert('Signed out successfully!');
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed!');
      }
    };

    doLogout();
  }, []);

  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <p className="text-lg text-gray-800">Logging out...</p>
    </div>
  );
};

export default Logout;
