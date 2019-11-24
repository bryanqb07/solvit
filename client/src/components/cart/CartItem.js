import React from 'react';

const CartItem = ({cartItem}) => (
    <div>
        <span>Name: {cartItem.name}</span>
        <br />
        <span>Price: ${cartItem.price}</span>
        { console.log(cartItem) }
    </div>
)

export default CartItem;