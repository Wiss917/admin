import './App.css';
import routes from 'routes';
import AuthContext from 'context/authContext';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { hasToken } from 'utils/auth';
import { IRedirectState } from 'interfaces/route';
import { useCallback, useState } from 'react';

function App() {
  const elements = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginState, setLoginState] = useState(hasToken());
  const goRedirect = useCallback(
    (code: number) => {
      let state: IRedirectState = {
        from: location,
        alertType: undefined,
        msg: '',
      };

      switch (code) {
        case 401: {
          localStorage.clear();
          navigate('signIn', {
            state: {
              ...state,
              msg: '用户验证信息已过期，请重新登录！',
              alertType: 'warning',
            },
            replace: true,
          });
          return true;
        }
        case 500: {
          navigate('404', {
            state: {
              ...state,
              msg: '系统内部异常，请稍后再试！',
              alertType: 'error',
            },
            replace: true,
          });
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
        loginState,
        goRedirect,
        setLoginState,
      }}
    >
      {elements}
    </AuthContext.Provider>
  );
}

export default App;
