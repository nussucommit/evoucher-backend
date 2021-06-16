import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import useAuth from "hooks/useAuth";
import { Routes } from "constants/routes";

const PublicRoute = (props: RouteProps & { component: React.FC }) => {
    const { component: Component, ...routeProps } = props;
    const { isAuth } = useAuth();
    return (
        <Route
            {...routeProps}
            render={(routeComponentProps) =>
                isAuth ? (
                    <Redirect
                        to={{
                            pathname: Routes.index,
                            state: { from: routeComponentProps.location },
                        }}
                    />
                ) : (
                    <Component {...routeComponentProps} />
                )
            }
        />
    );
};

export default PublicRoute;
