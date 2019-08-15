import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isTokenExpired } from "../authentication/oauthHandler";

const PrivateRoute = ({ component: Component, isAutenticado, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isTokenExpired(localStorage.getItem("access_token")) ===
                true ? (
                    <Redirect to={{ pathname: "/login" }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
