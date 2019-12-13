import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from '../graphql/queries';
import Modal from "./Modal";
import Login from "./Login";
import Registration from "./Registration";

class Nav extends Component {
    state = { showLoginModal: false, showSignupModal: false }

    showModal = (field) => {
        return e => {
            e.stopPropagation();
            this.setState({ [field]: true });
        }
    };

    hideModal = (field) => {
        return e => {
            e.stopPropagation();
            this.setState({ [field]: false });
        }
    };

    render(){
        return (
            <ApolloConsumer>
                {client => (
                    <Query query={IS_LOGGED_IN}>
                        {({ data }) => {
                            if (data.isLoggedIn) {
                                return (
                                    <div className="background-main">
                                        <div className="topbar-wrapper wrapped top-padding">
                                            <span>Welcome !</span>
                                            <Link
                                                to={"/users/" + data.userId}
                                                className="w3-bar-item w3-button w3-padding">
                                                User Profile
                                            </Link>
                                            <Link
                                                to={ "/orders/" + data.userId }
                                                className="w3-bar-item w3-button w3-padding">
                                                My Orders
                                            </Link>
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
                                    </div>
                                );
                            } else {
                                return (
                                    <div>
                                        <Modal show={this.state.showLoginModal} handleClose={this.hideModal("showLoginModal")}>
                                            <Login />
                                        </Modal>
                                        <button
                                            type="button" onClick={this.showModal("showLoginModal")}
                                            className="">
                                            Login
                                        </button>
                                        <Modal show={this.state.showSignupModal} handleClose={this.hideModal("showSignupModal")}>
                                            <Registration />
                                        </Modal>
                                        <button 
                                            type="button" onClick={this.showModal("showSignupModal")}
                                            className="">
                                            Register
                                         </button>
                                    </div>
                                );
                            }
                        }}
                    </Query>
                )}
            </ApolloConsumer>
        );
    }

};

export default Nav;