import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { FETCH_PRODUCT_PRICE, FETCH_CART_ITEMS } from '../graphql/queries';
import AddItemToCart from './products/AddToCart';
import { withRouter } from "react-router";

class PriceQuote extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            startDate: "",
            endDate: "",
            totalFeet: 0
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    render(){
        console.log(this.state);
        if(!this.state.clicked){
            return(
                <div>
                    <label>Start Date: </label>
                    <input
                        onChange={this.update("startDate")}
                        value={this.state.startDate} 
                        type="date" />
                    <br />
                    <label>End Date: </label>
                    <input
                        onChange={this.update("endDate")}
                        value={this.state.endDate} 
                        type="date" />
                    <br />
                    <label>Total Area (ft.)</label>
                    <input
                        onChange={this.update("totalFeet")}
                        value={this.state.totalFeet}
                        type="number" />
                    <br />
                    <button onClick={e => {
                        e.preventDefault();
                        this.setState({ clicked: true })
                    }}>Get instant quote</button>
                </div>
            );
        }
        const priceParams = {
            id: this.props.id,
            totalFeet: parseFloat(this.state.totalFeet),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        return(
            <ApolloConsumer>
                {cache => (
                    <Query query={FETCH_PRODUCT_PRICE} variables={priceParams}>
                        {({ loading, error, data }) => {
                            if (loading) return <div className="loader">Loading...</div>
                            if (error) return `Error! ${error.message}`;
                            const { id, name, price, installationFee } = data.getProductPrice
                            const total = price + installationFee
                            return (
                            <div>
                                <p>Subtotal: ${price}</p>
                                <p>Installation fee: ${installationFee}</p>
                                <p>Total: ${total}</p>
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
                                            cart: [...cart, {
                                                name, 
                                                id, 
                                                startDate: this.state.startDate,
                                                endDate: this.state.endDate,
                                                subtotal: price, 
                                                installationFee, 
                                                total }]
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