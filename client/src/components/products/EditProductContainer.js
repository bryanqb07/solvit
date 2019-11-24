import React from 'react';
import CreateProduct from "../CreateProduct";
import { FETCH_PRODUCT_AND_CATEGORIES, FETCH_CATEGORIES } from "../../graphql/queries";
import { Query } from "react-apollo";

const EditProductContainer = props => (
    <Query query={props.match.params.id ? FETCH_PRODUCT_AND_CATEGORIES : FETCH_CATEGORIES} variables={props.match.params}>
    {({ loading, error, data }) => {
        if (loading) return <div className="loader">Loading...</div>
        if (error) return `Error! ${error.message}`;
        const categories = data.categories;
        const product = data.product;
        return (
            <CreateProduct 
                product={product} categories={categories} 
                productId={props.match.params.id} update={props.match.params.id ? true : false} />
        );
    }}
    </Query>
);

export default EditProductContainer;