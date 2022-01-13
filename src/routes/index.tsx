import NotFound from 'pages/404';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
