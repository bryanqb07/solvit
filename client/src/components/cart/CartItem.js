import React from 'react';

const CartItem = ({cartItem}) => (
    <div className="cart-item-container">
        <span className="cart-item-name">{cartItem.name}</span>
        <span>${cartItem.total}</span>
    </div>
)

export default CartItem;