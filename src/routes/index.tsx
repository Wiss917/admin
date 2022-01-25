import NotFound from 'pages/404';
import Dashboard from 'pages/Dashboard1';
import Login from 'pages/Login';
import SignInSide from 'pages/template/SignInSide';
import SignIn from 'pages/template/SignIn';
import SignUp from 'pages/template/SignUp';
import Album from 'pages/template/Album';
import { Navigate, RouteObject, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'context/authContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { hasLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return !hasLoggedIn ? (
    <Navigate to="signIn" state={{ from: location }} replace />
  ) : (
    children
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
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
        path: 'album',
        element: (
          <RequireAuth>
            <Album />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '404',
    element: <NotFound />,
  },
  { path: '*', element: <Navigate to="404" /> },
];

export default routes;
