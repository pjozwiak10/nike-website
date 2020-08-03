import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageTransition from '../components/page-transition/PageTransition';

const PrivateRoute = ({ component: Component, history, location, ...rest }) => {
  const user = useSelector(state => state.user);
  return (
    <Route {...rest} render={props => (
      user.isAuthenticated ? <Component {...props} /> : <PageTransition><Redirect to={{ pathname: location.state ? '/' : '/signup-signin', state: { from: location.pathname } }} /></PageTransition>
    )} />
  )
}

export default PrivateRoute;
