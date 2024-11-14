import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from './AuthContext';

const ProtectedRoute = ({ element: Element }) => {
    const { isAuthenticated } = useAppContext();

    return isAuthenticated ? <Element /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;