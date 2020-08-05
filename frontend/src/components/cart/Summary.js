import React, { memo } from 'react'

const Summary = memo(({ totalPrice }) => {
  return (
    <div className="cart__summary">
      <h1 className="cart__headline cart__headline--summary">Summary</h1>
      <div className="cart__summary-inner">
        <p className="cart__summary-label">Subtotal</p>
        <p className="cart__summary-value">{totalPrice} zł</p>
        <p className="cart__summary-label">Estimated Delivery & Handling</p>
        <p className="cart__summary-value">0.00 zł</p>
        <p className="cart__summary-label cart__summary-label--total">Total</p>
        <p className="cart__summary-value cart__summary-value--total">{totalPrice} zł</p>
      </div>
    </div>
  )
});

export default Summary
