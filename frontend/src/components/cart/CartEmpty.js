import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = memo(() => {
  return (
    <div className="cart__empty">
      <p className="cart__empty-text">Your shopping cart is empty.</p>
      <p className="cart__empty-text-small">Add products to it to be able to start ordering.</p>
      <Link to="/" className="cart__empty-button">Start shopping</Link>
    </div>
  )
});

export default CartEmpty
