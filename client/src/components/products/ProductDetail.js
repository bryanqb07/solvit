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
                if (error) return <div className="error">`Error! ${error.message}`</div>
                
                const product = data.product;

                return (
                    <div className="product-view-container">
                        <div className="product-view-left">
                            <img src="testPanel.jpg" alt="product" className="product-detail-img" />
                        </div>
                        <div className="product-view-right">
                            <h2>{product.name}</h2>
                            <hr className="light-grey" />
                            <p>Description: {product.description}</p>
                            <p>Dimensions: {product.width} x {product.height} ft.</p>
                            <hr className="light-grey" />
                            <h3>Get an instant price quote online!</h3>
                            <PriceQuote id={product.id} />
                        </div>
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;