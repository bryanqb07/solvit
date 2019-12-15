import React from "react";
import { FETCH_CART_ITEMS } from "../graphql/queries";
import { ApolloConsumer, Query } from "react-apollo";

const RemoveItemFromCart = ({ id, mini }) => {
  return (
    <ApolloConsumer>
      {cache => (
        <Query query={FETCH_CART_ITEMS} >
          {({ loading, error, data }) => {
            if (loading) return <div className="loader"></div>;
            if (error) return <div className="error">`Error! ${error.message}`</div>
            if (!data) return;
            if (data.cart.some(item => item.id === id)) {
              return (
                <button
                  onClick={e => {
                    e.preventDefault();
                    // first we read the query from the cache
                    const { cart } = cache.readQuery({
                      query: FETCH_CART_ITEMS
                    });
                    // filter out the item we want to remove
                    const data = {
                      cart: cart.filter(item => item.id !== id)
                    };
                    // re-add to our cache with that removed item
                    cache.writeQuery({ query: FETCH_CART_ITEMS, data });
                  }}
                >
                  { mini ? 'x' : 'Remove from cart' }
                </button>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default RemoveItemFromCart;
