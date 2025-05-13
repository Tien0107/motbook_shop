import { Navigate } from 'react-router-dom';
import useAuthStore from '../../features/auth/stores/authStore';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthStore();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 