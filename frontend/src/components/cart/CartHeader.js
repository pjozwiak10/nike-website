import React from 'react'

const CartHeader = ({ quantityItems, totalPrice }) => {
  return (
    <div className="cart__header">
      <h1 className="cart__headline">Cart</h1>
      <div className="cart__main-info-wrapper">
        <span className="cart__main-info cart__main-info--quantity">{quantityItems} {quantityItems > 1 ? 'Items' : 'Item'}</span>
        <span className="cart__main-info">{totalPrice} zł</span>
      </div>
    </div>
  )
}

export default CartHeader
