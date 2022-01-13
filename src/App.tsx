import { useRoutes, Outlet } from 'react-router-dom';
import routes from 'routes';
import './App.css';

function App() {
  const elements = useRoutes(routes);

  return (
    <div>
      {elements}
      <Outlet />
    </div>
  );
}

export default App;
