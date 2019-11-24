import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { VERIFY_USER } from './graphql/mutations';
// import { persistCache } from 'apollo-cache-persist';

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
});

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
    headers: {
        authorization: localStorage.getItem("auth-token")
    }
});

// make sure we log any additional errors we receive
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

// // await before instantiating ApolloClient, else queries might run before the cache is persisted
// await persistCache({
//     cache,
//     storage: window.localStorage,
// });

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    },
    resolvers: {}
});

const token = localStorage.getItem("auth-token");
const isStaff = localStorage.getItem("isStaff");
const userId = localStorage.getItem("userId");

cache.writeData({
    data: {
        isLoggedIn: Boolean(localStorage.getItem("auth-token")),
        userId
    }
});

if(token){
    client
        .mutate({ mutation: VERIFY_USER, variables: { token, isStaff }})
        .then( ({ data }) => {
            cache.writeData({
                data: {
                    isLoggedIn: data.verifyUser.loggedIn,
                    isStaff: data.verifyUser.isStaff,
                    cart: [],
                    userId: data.verifyUser.id
                }
            });
        });
}else{
    cache.writeData({
        data: {
            isLoggedIn: false,
            isStaff: false,
            cart: [],
            userId: null
        }
    });
}

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
