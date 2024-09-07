// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

const ProtectedRoute = ({ element }) =>
{
  const token = getCookie('authToken');
  if (!token)
  {
    return <Navigate to="/signin" />;
  }
  return element;
};

export default ProtectedRoute;
