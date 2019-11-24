import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../graphql/mutations";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            message: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, {data}){
        client.writeData({
            data: { 
                isLoggedIn: data.login.loggedIn, 
                isStaff: data.login.isStaff,
                userId: data.login.id }
        });
    }

    render(){
        return(
            <Mutation
                mutation={LOGIN_USER}
                onError={err => this.setState({ message: err.message })}
                onCompleted={data => {
                    const { token, isStaff, id } = data.login;
                    localStorage.setItem("auth-token", token);
                    localStorage.setItem("userId", id);
                    if(this.props.location.pathname === "/staff/login" && isStaff){
                        localStorage.setItem("isStaff", isStaff);    
                        this.props.history.push("/staff/index");
                    }else{
                        this.props.history.push("/");
                    }
 
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                { loginUser => (
                    <div className="login-wrapper">
                        <h1>Login</h1>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                loginUser({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                });
                            }}
                            >
                                <input
                                    value={this.state.email}
                                    onChange={this.update("email")}
                                    placeholder="email" 
                                />
                                <br/>
                                <input
                                    value={this.state.password}
                                    onChange={this.update("password")}
                                    placeholder="password"
                                    type="password"
                                />
                                <br />
                                <br />
                                <button type="submit">Login</button>
                            </form>
                            <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default Login;