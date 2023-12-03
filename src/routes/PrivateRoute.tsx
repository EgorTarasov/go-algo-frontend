import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../utils/storage';

function PrivateRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = Boolean(storage.getToken());

  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isAuthorized && !hasRedirected) {
      navigate('/', { state: { from: location } });
      setHasRedirected(true);
    }
  }, [isAuthorized, navigate, location, hasRedirected]);

  return children;
}

export default PrivateRoute;
