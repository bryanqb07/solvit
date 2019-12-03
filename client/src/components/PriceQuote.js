import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { FETCH_PRODUCT_PRICE } from '../graphql/queries';

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
            <Query query={FETCH_PRODUCT_PRICE} variables={{ id: this.props.id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader">Loading...</div>
                    if (error) return `Error! ${error.message}`;
                    const price = data.getProductPrice.price
                    // const price = data.product.price;
                    // console.log(price);
                    // alert("Here's your price $" + price);
                    return <div>Here's your price ${price}</div>;
                }}
            </Query>
        );
    }
}

export default PriceQuote;