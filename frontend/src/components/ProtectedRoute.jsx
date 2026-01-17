import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  // Agar yuklanayotgan bo'lsa
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Agar token bo'lmasa, login ga yo'naltirish
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar requiredRole bo'lsa va user roli mos kelmasa
  if (requiredRole) {
    if (requiredRole === 'admin' && user?.role !== 'admin' && user?.role !== 'owner') {
      return <Navigate to="/" replace />;
    }
    
    if (requiredRole === 'owner' && user?.role !== 'owner') {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
