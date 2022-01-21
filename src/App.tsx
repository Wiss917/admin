import './App.css';
import routes from 'routes';
import AuthContext from 'context/authContext';
import { useRoutes } from 'react-router-dom';
import { hasToken } from 'utils/auth';

function App() {
  const elements = useRoutes(routes);
  const hasLoggedIn = hasToken();

  return (
    <AuthContext.Provider value={{ hasLoggedIn }}>
      {elements}
    </AuthContext.Provider>
  );
}

export default App;
