import React from "react";
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query, ApolloConsumer } from "react-apollo";

const AddItemToCart = ({id, price, name, startDate, endDate, total, installationFee, totalFootage}) => {
    return (
        <ApolloConsumer>
            {cache => (
            <Query query={FETCH_CART_ITEMS} variables={{ productId: id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader"></div>
                        if (error) return <div className="error">`Error! ${error.message}`</div>
                    if(data && data.cart && data.cart.some(item => item.id === id)){
                        return (
                            <button
                                className="selection-button add-to-cart red-bg zoom"
                                id="remove-from-cart" 
                                onClick={e => {
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
                            <button className="selection-button add-to-cart blue-bg zoom"
                                onClick={e => {
                                    e.preventDefault();
                                    // read from the cache
                                    const { cart } = cache.readQuery({
                                        query: FETCH_CART_ITEMS
                                    });
                                    // create our object with the id and cost from our props and add it to
                                    // the array of cart items
                                    const data = {
                                        cart: [...cart, {
                                            name,
                                            id,
                                            startDate,
                                            endDate,
                                            subtotal: price,
                                            installationFee,
                                            total,
                                            totalFootage
                                        }]
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
