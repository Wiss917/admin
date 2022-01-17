import NotFound from 'pages/404';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import SignInSide from 'pages/template/SignInSide';
import SignIn from 'pages/template/SignIn';
import SignUp from 'pages/template/SignUp';
import Album from 'pages/template/Album';
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
  {
    path: '/template',
    children: [
      {
        index: true,
        element: <SignInSide />,
      },
      {
        path: 'signIn',
        element: <SignIn />,
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
      {
        path: 'album',
        element: <Album />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
