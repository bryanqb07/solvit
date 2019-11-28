import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_PRODUCT } from "../../graphql/queries";
import { Query } from "react-apollo";
import AddItemToCart from "./AddToCart";
import InstantQuote from "../InstantQuote";

function ProductDetail(props) {
    return (
        <Query query={FETCH_PRODUCT} variables={ props.match.params }>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;

                const product = data.product;
                return (
                    <div>
                        <img src="testFence.png"></img>
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price}</p>
                        <InstantQuote id={product.id} />
                        <AddItemToCart price={product.price} id={product.id} name={product.name} />
                        <Link to={"/cart/checkout"}>Checkout</Link>
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;