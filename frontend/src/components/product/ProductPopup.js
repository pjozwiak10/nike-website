import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const ProductPopup = ({ popupMsg, handleDeletePopup, addedProduct }) => {
  useEffect(() => {
    gsap.to('.product__popup-wrapper', { duration: 0, visibility: 'visible' })
    gsap.from('.product__popup-wrapper', { duration: 0.4, opacity: 0 })
    gsap.from('.product__popup', { duration: 0.4, opacity: 0, delay: 0.4 })
  }, [])
  return (
    <div className="product__popup-wrapper">
      {(() => {
        switch (popupMsg) {
          case 'added':
            return (
              <div className="product__popup product__popup--added-product">
                <p className="product__added-product-name">{addedProduct.name}</p>
                <div className="product__added-product-image-container">
                  <img src={addedProduct.images[0]} alt={addedProduct.name} className={`product__added-product-image product__added-product-image${addedProduct.className}`} />
                </div>
                <p className="product__added-product-price">Price: {addedProduct.price.formatted}</p>
                <p className="product__added-product-size">Size: {addedProduct.categories.includes('shoes') ? 'EU' : null} {addedProduct.size}</p>
                <div className="product__added-product-buttons">
                  <Link to="/shopping-cart" className="product__added-product-button product__added-product-button--solid">Go To Cart</Link>
                  <button className="product__added-product-button" onClick={handleDeletePopup}>Continue Shopping</button>
                </div>
              </div>
            )
          default:
            return (
              <div className="product__popup">
                <p className="product__popup-message">{popupMsg}</p>
                <button className="product__popup-button" onClick={handleDeletePopup}>OK</button>
              </div>
            )
        }
      })()}
    </div>
  )
}

export default ProductPopup;
