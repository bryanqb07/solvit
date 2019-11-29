import React from "react";
import CheckoutForm from './CheckoutForm';
import { FETCH_CART_ITEMS_AND_USER } from "../../graphql/queries";
import { Query } from "react-apollo";
import CartItem from "../cart/CartItem";

const Checkout = () => {
    return(
        <Query query={FETCH_CART_ITEMS_AND_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;
                // if (!data) return null;
                if (data && data.cart && data.cart.length > 0) {
                    let total = data.cart.map(item => item.price).reduce((acc, cv) => acc + cv);
                    let productIds = data.cart.map(item => item.id);
                    return (
                        <div className="flex space-evenly">
                            <CheckoutForm user={data.userId} products={productIds} total={total}/>
                            <div>
                                <h3>Order Summary</h3>
                                {data.cart.map(cartItem => (
                                    <div key={cartItem.id}>
                                        <CartItem cartItem={cartItem} total={total}/>
                                    </div>
                                ))}
                                <p>Total: ${total}</p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>Cart is empty.</div>
                    )
                }
            }}
        </Query>
    )
}

export default Checkout;