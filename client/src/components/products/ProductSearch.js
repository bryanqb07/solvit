import React from "react";
import { SEARCH_PRODUCTS } from "../../graphql/queries";
import { Query } from "react-apollo";
import ProductContainer from "./ProductContainer";

const ProductsSearch = (props) => {
    const queryString = { queryString: props.history.location.search.split("=")[1] };
    // console.log(queryString);
    return(
        <Query query={SEARCH_PRODUCTS} variables={queryString}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader"></div>
                if (error) return <div className="error">`Error! ${error.message}`</div>
                const products = data.searchProducts;
                if(!products) return <div>No products found. Please search again.</div>
                return <ProductContainer products={products} nonStaff={true} />
            }}
        </Query>
    )
}



export default ProductsSearch;