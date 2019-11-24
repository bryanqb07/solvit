import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from '../../graphql/queries';

const Sidebar = () => (
    <ApolloConsumer>
        {client => (
            <Query query={IS_LOGGED_IN}>
                {({ data }) => {
                    if (data.isLoggedIn) {
                        return (
                            <nav
                                className="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
                                id="mySidebar"
                            >
                                <Link to="/staff/index" className="w3-container w3-display-container w3-padding-16 w3-button">
                                    <h3 className="w3-wide">
                                        <b>Fence Share</b>
                                    </h3>
                                </Link>
                                <div
                                    className="w3-padding-64 w3-large w3-text-grey"
                                    id="categoryList"
                                >
                                    <NavLink
                                        to="/staff/products" 
                                        className="w3-bar-item w3-button" 
                                        activeClassName='is-active'>Products</NavLink>
                                    <NavLink
                                        to="/staff/categories" 
                                        className="w3-bar-item w3-button" 
                                        activeClassName='is-active'>Categories</NavLink>
                                    <NavLink
                                        to="/staff/orders" 
                                        className="w3-bar-item w3-button" 
                                        activeClassName='is-active'>Orders</NavLink>
                                    <button
                                        className="w3-bar-item w3-button w3-padding"
                                        onClick={e => {
                                            e.preventDefault();
                                            localStorage.removeItem("auth-token");
                                            localStorage.removeItem("isStaff");
                                            client.writeData({
                                                data: {
                                                    isLoggedIn: false,
                                                    isStaff: false,
                                                    userId: null
                                                }
                                            });
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </nav>
                        );
                    }else{
                        return(
                            <nav
                                className="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
                                id="mySidebar"
                            >
                                <Link to="/staff/index" className="w3-container w3-display-container w3-padding-16 w3-button">
                                    <h3 className="w3-wide">
                                        <b>Fence Share</b>
                                    </h3>
                                </Link>
                            </nav>
                        );
                    }
                }}
            </Query>
        )}
    </ApolloConsumer>
);

export default Sidebar;