import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to='/' />;
    }
    return children;
};

export default ProtectedRoute;
