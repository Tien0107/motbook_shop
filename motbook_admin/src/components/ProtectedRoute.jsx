import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../features/auth/stores/authStore';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;