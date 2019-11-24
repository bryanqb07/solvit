import React from "react";
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query } from "react-apollo";
import CartItem from "./CartItem";

function Cart() {
    return (
        <Query query={FETCH_CART_ITEMS}>
            {({ loading, error, data }) => {
                if (loading) return <div class="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;

                if(data.cart.length > 0){
                    return (
                        <ul>
                            { data.cart.map(cartItem => (
                                <li key={cartItem.id}>
                                <CartItem cartItem={cartItem} />
                            </li> 
                            )) }
                            <li>Total: ${data.cart.map(item => item.price).reduce((acc, cv) => acc + cv)}</li>
                            <button>Checkout</button>
                        </ul>
                    )
                }else{
                    return (
                        <div>Cart is empty.</div>   
                    )
                }
            }}
        </Query>
    );
}

export default Cart;
