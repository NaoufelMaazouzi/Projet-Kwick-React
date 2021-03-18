
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                authTokens ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/Projet-Kwick-React/login" />
                    )
            }
        />
    );
}

export default PrivateRoute;