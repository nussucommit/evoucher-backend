import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import useAuth from "hooks/useAuth";
import { Routes } from "constants/routes";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
    component: React.ElementType;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
    const { component: Component, ...routeProps } = props;
    const { isAuth } = useAuth();
    return (
        <Route
            {...routeProps}
            render={(props) =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: Routes.login,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
