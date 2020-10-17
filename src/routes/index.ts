import React from 'react';

const GamesComponent = React.lazy(() => import('./games'));
const LoginComponent = React.lazy(() => import('./login'));

export interface Route {
  exact?: boolean;
  path: string;
  component: React.FC<any>;
  routes?: any[];
  protected?: boolean;
}

export const routes: Route[] = [
  {
    path: '/games',
    exact: true,
    component: GamesComponent,
    protected: true
  },
  {
    path: '/login',
    exact: true,
    component: LoginComponent,
  }
];
