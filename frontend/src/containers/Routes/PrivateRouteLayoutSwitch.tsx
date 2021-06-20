import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import useAuth from "hooks/useAuth";
import { Routes } from "constants/routes";

const PrivateRouteLayoutSwitch = (props: RouteProps) => {
    const { children, ...routeProps } = props;
    const { isAuth } = useAuth();
    return (
        <Route
            {...routeProps}
            render={(routeComponentProps) =>
                isAuth ? (
                    <Switch {...routeComponentProps}>{children}</Switch>
                ) : (
                    <Redirect
                        to={{
                            pathname: Routes.login,
                            state: { from: routeComponentProps.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteLayoutSwitch;
