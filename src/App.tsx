import './App.css';
import routes from 'routes';
import AuthContext from 'context/authContext';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { hasToken } from 'utils/auth';
import { useCallback, useState } from 'react';

function App() {
  const elements = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginState, setLoginState] = useState(hasToken());
  const goRedirect = useCallback(
    (code: number) => {
      switch (code) {
        case 401: {
          localStorage.clear();
          navigate('signIn', { state: location, replace: true });
          return true;
        }
        case 500: {
          navigate('404', { state: location, replace: true });
          return true;
        }
        default:
          return false;
      }
    },
    [navigate, location]
  );
  return (
    <AuthContext.Provider
      value={{
        hasLoggedIn: loginState,
        goRedirect,
        setLoginState: (state) => {
          setLoginState(state);
        },
      }}
    >
      {elements}
    </AuthContext.Provider>
  );
}

export default App;
