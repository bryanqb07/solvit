import React from 'react';

const CartItem = ({cartItem}) => (
    <div>
        <span>Name: {cartItem.name}</span>
        <br />
        <span>Price: ${cartItem.total}</span>
    </div>
)

export default CartItem;