import React from "react";
import { FETCH_PRODUCTS } from "../../graphql/queries";
import { Query } from "react-apollo";
import ProductContainer from "./ProductContainer";

const ProductsIndex = (props) => (
  <Query query={FETCH_PRODUCTS}>
    {({ loading, error, data }) => {
      if (loading) return <div className="loader">Loading...</div>
      if (error) return `Error! ${error.message}`;

      return <ProductContainer products={data.products} nonStaff={props.match.path === "/"} />
    }}
  </Query>
);

export default ProductsIndex;
