import React from 'react';
import { Query } from 'react-apollo';
import { FETCH_PRODUCT_PRICE } from '../graphql/queries';

const PriceQuote = ({id}) => (        
    <button onClick={e => {
        e.preventDefault();
        return (
            <Query query={FETCH_PRODUCT_PRICE} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader">Loading...</div>
                    if (error) return `Error! ${error.message}`;
                    const price = data.product.price;
                    console.log(price);
                    alert("Here's your price $" + price);
                    return <div>Here's your price ${price}</div>;
                }}
            </Query>
        );
    }}>Get instant quote</button>
);

export default PriceQuote;