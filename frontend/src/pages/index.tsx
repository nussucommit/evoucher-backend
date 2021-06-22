import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { Routes } from "constants/routes";
import history from "utils/history";

import { PublicRoute, PrivateRoute } from "containers/Routes";

// Public Pages
// const Login = lazy(() => import("./Login"));
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ChangePassword from "./ChangePassword";

// Protected Pages

const Pages = () => {
    return (
        <Router history={history}>
            <Switch>
                {/* Public routes */}
                <PublicRoute path={Routes.login} component={Login} />
                <PublicRoute path={Routes.register} component={Register} />

                {/* Private routes */}
                <PrivateRoute exact path={Routes.index} component={Home} />
                <PrivateRoute
                    exact
                    path={Routes.changePassword}
                    component={ChangePassword}
                />
            </Switch>
        </Router>
    );
};

export default Pages;
