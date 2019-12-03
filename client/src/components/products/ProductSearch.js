import React from "react";
import { SEARCH_PRODUCTS } from "../../graphql/queries";
import { Query } from "react-apollo";
import ProductContainer from "./ProductContainer";

const ProductsSearch = (props) => {
    return(
        <Query query={SEARCH_PRODUCTS}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;

                return <ProductContainer products={data.products} nonStaff={true} />
            }}
        </Query>
    )
}



export default ProductsSearch;