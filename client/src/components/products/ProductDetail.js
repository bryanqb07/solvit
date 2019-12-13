import React from "react";
import { FETCH_PRODUCT } from "../../graphql/queries";
import { useQuery } from '@apollo/react-hooks';
import PriceQuote from "../PriceQuote";

const ProductDetail = ({match, history}) => {
    const { loading, error, data } = useQuery(FETCH_PRODUCT, {
        variables: match.params
    });

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
                <PriceQuote id={product.id} history={history} />
            </div>
        </div>
    )
};

export default ProductDetail;