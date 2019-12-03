import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { FETCH_PRODUCT_PRICE, FETCH_CART_ITEMS } from '../graphql/queries';
import AddItemToCart from './products/AddToCart';
import { withRouter } from "react-router";

class PriceQuote extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false
        };
    }

    render(){
        if(!this.state.clicked){
            return(
                <button onClick={e => {
                    e.preventDefault();
                    this.setState({clicked: true})
                }}>Get instant quote</button>
            );
        }
        return(
            <ApolloConsumer>
                {cache => (
                    <Query query={FETCH_PRODUCT_PRICE} variables={{ id: this.props.id }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div className="loader">Loading...</div>
                            if (error) return `Error! ${error.message}`;
                            const { id, name, price } = data.getProductPrice
                            return (
                            <div>
                                <p>Here's your price ${price}</p>
                                <AddItemToCart price={price} id={id} name={name} />
                                    <button onClick={e => {
                                        e.preventDefault();
                                        // read from the cache
                                        const { cart } = cache.readQuery({
                                            query: FETCH_CART_ITEMS
                                        });
                                        // create our object with the id and cost from our props and add it to
                                        // the array of cart items
                                        const data = {
                                            cart: [...cart, { id, price, name }]
                                        }
                                        cache.writeQuery({ query: FETCH_CART_ITEMS, data })
                                        this.props.history.push("/checkout");
                                    }}>
                                    Checkout
                                </button>
                            </div>
                            );
                        }}
                    </Query>
                )}
            </ApolloConsumer>
        );
    }
}

export default withRouter(PriceQuote);