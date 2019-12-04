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
                    <div>
                        <img src="testFence.png" alt="product"></img>
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Dimensions: {product.width} x {product.height} ft.</p>
                        <PriceQuote id={product.id}/>
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;