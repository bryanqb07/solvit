import React from 'react';
import CartItem from "../cart/CartItem";
import RemoveItemFromCart from "../RemoveFromCart";

const CheckoutSummary = ({ cartItems, subtotal, insuranceFee, salesTax }) => (
  <div>
    <h3>Order Summary</h3>
    {cartItems.map(cartItem => (
      <div key={cartItem.id}>
        <div className="cart-item-checkout-container">
          <CartItem cartItem={cartItem} />
          <RemoveItemFromCart id={cartItem.id} mini={true} />
        </div>
        <hr />
      </div>
    ))}

    {insuranceFee > 0 ? <div><p> Insurance Fee: ${insuranceFee.toFixed(2)}</p><hr /></div> : ""}
    {salesTax > 0 ? <div><p> Sales Tax (MS orders only): ${salesTax.toFixed(2)}</p><hr /></div> : ""}

    <p><b>Total: ${(subtotal + insuranceFee + salesTax).toFixed(2)}</b></p>
  </div>
);

export default CheckoutSummary;
