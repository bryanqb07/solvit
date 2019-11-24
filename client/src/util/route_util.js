import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";

const AuthRoute = ({
    component: Component,
    path,
    exact,
    routeType,
    ...rest
}) => (
    <Query query={IS_LOGGED_IN}>
        {({ data }) => {
            switch(routeType){
                case "auth": 
                    return (
                        <Route
                            path={path}
                            exact={exact}
                            render={props =>
                                !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
                            }
                        />
                    );
                case "protected":
                    return (
                        <Route
                            {...rest}
                            render={props =>
                                data.isLoggedIn ? (
                                    <Component {...props} />
                                ) : (
                                        <Redirect to="/login" />
                                    )
                            }
                        />
                    )
                case "admin-auth":
                    return (
                        <Route
                            path={path}
                            exact={exact}
                            render={props =>
                                !(data.isLoggedIn && data.isStaff) ? <Component {...props} /> : <Redirect to="/staff/index" />
                            }
                        />
                    );
                case "admin-protected":
                    return (
                        <Route
                            {...rest}
                            render={props =>
                                (data.isLoggedIn && data.isStaff) ? (
                                    <Component {...props} />
                                ) : (
                                        <Redirect to="/staff/login" />
                                    )
                            }
                        />
                    )
                default:
                    return (
                        <Route
                            path={path}
                            exact={exact}
                            render={props =>
                                <Component {...props} />
                            }
                        />
                    )
            }
        }}
    </Query>
);

export default AuthRoute;