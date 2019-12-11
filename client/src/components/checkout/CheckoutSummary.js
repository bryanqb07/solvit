import React from 'react';
import CartItem from "../cart/CartItem";
import RemoveItemFromCart from "../RemoveFromCart";

const CheckoutSummary = ({ cartItems, subtotal, insuranceFee, salesTax }) => (
  <div>
    <h3>Order Summary</h3>
    {cartItems.map(cartItem => (
      <div key={cartItem.id}>
        <CartItem cartItem={cartItem} />
        <RemoveItemFromCart id={cartItem.id} />
        { insuranceFee > 0 ? <p> Insurance Fee: ${insuranceFee}</p> : ""}
        { salesTax > 0 ? <p> Sales Tax (MS orders only): ${salesTax}</p> : ""}
        <hr />
      </div>
    ))}
    <p>Total: ${subtotal + insuranceFee + salesTax}</p>
  </div>
);

export default CheckoutSummary;
