import NotFound from 'pages/404';
import Dashboard from 'pages/Dashboard';
import SignInSide from 'pages/template/SignInSide';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/template/SignUp';
import Album from 'pages/template/Album';
import { Navigate, RouteObject, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'context/authContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loginState } = useContext(AuthContext);
  const location = useLocation();

  return !loginState ? (
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
