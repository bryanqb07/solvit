import React from "react";
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query, ApolloConsumer } from "react-apollo";

const AddItemToCart = ({id, price, name}) => {
    return (
        <ApolloConsumer>
            {cache => (
            <Query query={FETCH_CART_ITEMS} variables={{ productId: id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div class="loader">Loading...</div>
                    if (error) return `Error! ${error.message}`;
                    if(!data) return;
                    if(data.cart.some(item => item.id === id)){
                        return (
                            <button onClick={e => {
                                e.preventDefault();
                                // first we read the query from the cache
                                const { cart } = cache.readQuery({
                                    query: FETCH_CART_ITEMS
                                })
                                 // filter out the item we want to remove
                                const data = {
                                    cart: cart.filter(item => item.id !== id)
                                }
                                // re-add to our cache with that removed item
                                cache.writeQuery({ query: FETCH_CART_ITEMS, data })
                            }}>Remove from cart</button>
                        );
                    }else{
                        return(
                            <button onClick={e => {
                                e.preventDefault();
                                // read from the cache
                                const { cart } = cache.readQuery({
                                    query: FETCH_CART_ITEMS
                                });
                                // create our object with the id and cost from our props and add it to
                                // the array of cart items
                                const data = {
                                    cart: [...cart, { id, price, name } ]
                                } 
                                // console.log(data);
                                // write to our cache with our new array of cart items!
                                cache.writeQuery({ query: FETCH_CART_ITEMS, data })
                            }}>
                                Add to cart
                            </button>
                        )
                    }
                }}
            </Query>
            )}
        </ApolloConsumer>
    );
}

export default AddItemToCart;
