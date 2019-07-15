import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, isAutenticado, ...rest}) => {
  console.log("REST", rest);
  return (
    <Route
      {...rest}
      render={(props) => isAutenticado === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', }} />}
    />
  )
}

export default PrivateRoute;
