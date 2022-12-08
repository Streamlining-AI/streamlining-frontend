import React from 'react';
import { Navigate  } from 'react-router-dom';
import { useUser } from '../../state/user/hooks';
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  return <>{user ? children : <Navigate to="/login"  replace={true}/>}</>;
};

export default ProtectedRoute;