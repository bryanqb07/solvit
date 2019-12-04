import React from "react";
import { FETCH_CATEGORY } from "../../graphql/queries";
import { Query } from "react-apollo";
import ProductContainer from '../products/ProductContainer';

function CategoryDetail(props) {
    return (
        <Query query={FETCH_CATEGORY} variables={props.match.params}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader"></div>
                if (error) return `Error! ${error.message}`;

                return <ProductContainer products={data.category.products} />
            }}
        </Query>
    );
}

export default CategoryDetail;