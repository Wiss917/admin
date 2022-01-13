import NotFound from 'pages/404';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<NotFound />}>
        {lazy(() => import('pages/dashboard'))}
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<NotFound />}>
        {lazy(() => import('pages/login'))}
      </Suspense>
    ),
  },
  { path: "*", element: <NotFound /> }
];

export default routes;
