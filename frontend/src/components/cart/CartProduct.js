import React, { memo } from 'react'

const CartProduct = memo(({ product, addToCart, removeFromCart, removeFromCartAll }) => {
  return (
    <div className="cart__product">
      <div className="cart__product-image-container">
        <img src={product.images[0]} alt={product.name} className="cart__product-image" />
      </div>
      <div className="cart__product-description">
        <p className="cart__product-name">{product.name}</p>
        <p className="cart__product-type">{product.type}</p>
        <p className="cart__product-size">Size <span className="cart__product-value">{product.size}</span></p>
        <p className="cart__product-quantity">Quantity <span className="cart__product-value">{product.quantity}</span></p>
        <div className="cart__product-buttons">
          <button className="cart__product-increase" onClick={() => addToCart(product)}><i className="fas fa-plus"></i></button>
          <button className="cart__product-decrease" onClick={() => removeFromCart(product.id)}><i className="fas fa-minus"></i></button>
          <button className="cart__product-remove" onClick={() => removeFromCartAll(product.id)}>Remove</button>
        </div>
      </div>
      <div className="cart__product-price">
        <p className="cart__product-price-value">{product.price.formatted}</p>
      </div>
    </div>
  )
});

export default CartProduct
