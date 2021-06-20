import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { Routes } from "constants/routes";
import history from "utils/history";

import { PublicRoute, PrivateRouteLayoutSwitch } from "containers/Routes";

// Public Pages
// const Login = lazy(() => import("./Login"));
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

// Protected Pages

const Pages = () => {
    return (
        <Router history={history}>
            <Switch>
                <PublicRoute path={Routes.login} component={Login} />
                <PublicRoute path={Routes.register} component={Register} />
                {/* <PublicRoute
                        path={Routes.forgotPassword}
                        component={ForgotPassword}
                    />
                    <PublicRoute
                        path={Routes.setPassword}
                        component={SetPassword}
                    /> */}
                <PrivateRouteLayoutSwitch path={Routes.index}>
                    <Route exact path={Routes.index} component={Home} />
                </PrivateRouteLayoutSwitch>

                {/* <PrivateRouteLayoutSwitch
                        path={Routes.index}
                        layoutComponent={DashboardLayout}
                    >
                        <Route exact path={Routes.index} component={Home} />
                        <Route
                            exact
                            path={Routes.profile}
                            component={Profile}
                        />
                        <Route
                            exact
                            path={Routes.applications}
                            component={Applications}
                        />
                        <Route exact path={Routes.search} component={Search} />
                        <Route
                            exact
                            path={Routes.reports}
                            component={Reports}
                        />
                        <Route
                            exact
                            path={Routes.admins}
                            component={Administrators}
                        />
                        <Route
                            exact
                            path={Routes.adminForm}
                            component={AdminForm}
                        />
                        <Route
                            exact
                            path={Routes.leadsWelcome}
                            component={LeadsWelcome}
                        />
                        <Route
                            exact
                            path={Routes.leadsContent}
                            component={LeadsContent}
                        />
                    </PrivateRouteLayoutSwitch> */}
            </Switch>
        </Router>
    );
};

export default Pages;
