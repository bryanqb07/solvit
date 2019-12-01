import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query } from "react-apollo";
import CartItem from "./CartItem";
import RemoveItemFromCart from "../RemoveFromCart";


function Cart() {
    return (
        <Query query={FETCH_CART_ITEMS}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader">Loading...</div>
                if (error) return `Error! ${error.message}`;
                if(!data) return null;
                if(data.cart.length > 0){
                    return (
                        <ul>
                            { data.cart.map(cartItem => (
                            <li key={cartItem.id}>
                                <CartItem cartItem={cartItem} />
                                <RemoveItemFromCart id={cartItem.id} />
                            </li> 
                            )) }
                            <li>Total: ${data.cart.map(item => item.price).reduce((acc, cv) => acc + cv)}</li>
                            <Link to="/checkout">Checkout</Link>
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
