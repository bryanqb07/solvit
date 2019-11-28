import React from 'react';
import { Query } from 'react-apollo';
import { FETCH_PRODUCT_PRICE } from '../graphql/queries';

const InstantQuote = ({id}) => (
        <Query query={FETCH_PRODUCT_PRICE} variables={{ id: id }}>
            {({ loading, error, data }) => {
                if (loading) return <div class="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;
                console.log(data);
                return <div>"hello world"</div>;
            }}}
        </Query>
);

export default InstantQuote;