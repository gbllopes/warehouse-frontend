import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isTokenExpired } from '../authentication/oauthHandler';

const PrivateRoute = ({component: Component, isAutenticado, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => !isTokenExpired(localStorage.getItem("access_token")) === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', }} />}
    />
  )
}

export default PrivateRoute;
