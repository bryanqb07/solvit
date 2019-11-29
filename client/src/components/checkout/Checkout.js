import React from "react";
import Cart from "../cart/Cart";
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
    return(
        <div>
            <CheckoutForm />
            <Cart />
        </div>
    )
}

export default Checkout;