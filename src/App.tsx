import React, { Suspense } from 'react';
import { Switch, Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as LogoIcon } from './images/logo.svg';
import { routes, Route as RouteWithSubRoutes } from './routes';
import { selectAuth } from './store/slices/authSlice';

const RouteRenderer: React.FC<RouteWithSubRoutes> = (route) => {
  const location = useLocation();
  const { isAuthenticated} = useSelector(selectAuth);

  return (route.protected && isAuthenticated) || !route.protected ? (
    <Route
      path={route.path}
      render={props => {
        const Component: React.FC<{routes: unknown}> = route.component;

        return (<Component {...props} routes={route.routes}/>)
      }}
    />
  ) : (<Redirect
    to={{
      pathname: '/login',
      state: { from: location }
    }}
  />);
}

const App: React.FC = () => {
  return (
    <>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <LogoIcon className="app-logo" title="logo"/>
        </div>
      </div>
      <div className="main container">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteRenderer key={i} {...route} />
            ))}
            {/* handling unmatched paths */}
            <Route path='*'>
              <Redirect to='/login' />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default App;
