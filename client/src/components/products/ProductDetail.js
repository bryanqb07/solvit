import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_PRODUCT } from "../../graphql/queries";
import { Query } from "react-apollo";
import AddItemToCart from "./AddToCart";
import PriceQuote from "../PriceQuote";

function ProductDetail(props) {
    return (
        <Query query={FETCH_PRODUCT} variables={ props.match.params }>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader"></div>
                if (error) return `Error! ${error.message}`;
                
                const product = data.product;

                return (
                    <div className="product-view-container">
                        <div className="product-view-left">
                            <img src="testFence.png" alt="product" />
                        </div>
                        <div className="product-view-right">
                            <h3>Name: {product.name}</h3>
                            <p>Description: {product.description}</p>
                            <p>Dimensions: {product.width} x {product.height} ft.</p>
                            <PriceQuote id={product.id} />
                        </div>
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;