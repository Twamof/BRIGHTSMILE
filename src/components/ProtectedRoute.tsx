import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

interface Props {
    children: React.ReactNode;
    allowedRole?: UserRole;
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRole }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && currentUser.role !== allowedRole) {
        // دكتور يحاول دخول صفحة الممرضة أو العكس
        const redirectTo = currentUser.role === 'doctor' ? '/dashboard' : '/nurse';
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
