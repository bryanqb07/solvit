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
                if (loading) return <div className="loader"></div>
                if (error) return <div className="error">`Error! ${error.message}`</div>
                if(!data) return null;
                if(data.cart.length > 0){
                    return (
                        <div className="cart-container">
                            <h3>Your Shopping Cart</h3>
                            <ul>
                                {data.cart.map(cartItem => (
                                    <li key={cartItem.id}>
                                        <CartItem cartItem={cartItem} />
                                        <RemoveItemFromCart id={cartItem.id} />
                                    </li>
                                ))}
                                <li>Total: ${data.cart.map(item => item.total).reduce((acc, cv) => acc + cv)}</li>
                                <Link to="/checkout">Checkout</Link>
                            </ul>
                        </div>
                    )
                }else{
                    return (
                        <div className="empty-cart">
                            <h3>Your Shopping Cart</h3>
                            <p>Cart is empty.</p>
                        </div>   
                    )
                }
            }}
        </Query>
    );
}

export default Cart;
