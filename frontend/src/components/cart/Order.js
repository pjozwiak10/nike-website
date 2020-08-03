import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import gsap from 'gsap';
import Loader from '../loader/Loader';

const Order = ({ totalPrice, handleCheckout, handleShipping, shippingData, checkoutValidation, handleOrderMsg, orderMsg, loading }) => {

  const [shippingState, setShippingState] = useState(false);

  const handleShippingWrapper = () => {
    if (shippingState) {
      gsap.to('.cart__shipping-wrapper', { duration: 0.3, x: 100, opacity: 0 });
      gsap.to('.cart__shipping-wrapper', { duration: 0, display: 'none', delay: 0.3, onComplete: () => setShippingState(false) })
    } else {
      gsap.to('.cart__shipping-wrapper', { duration: 0, display: 'block' })
      gsap.to('.cart__shipping-wrapper', { duration: 0.3, x: 0, opacity: 1, onComplete: () => setShippingState(true) });
    }
  }

  return (
    <div className="cart__order">
      <div className="cart__shipping-wrapper">
        <span className="cart__shipping-headline">Please enter shipping details</span>
        <form className="cart__shipping-form">
          <div className="cart__shipping-input-box">
            <label className="cart__shipping-label">Address</label>
            <input type="text" name="address" className="cart__shipping-input" value={shippingData.address} onChange={handleShipping} />
          </div>
          <div className="cart__shipping-input-box">
            <label className="cart__shipping-label">City</label>
            <input type="text" name="city" className="cart__shipping-input" value={shippingData.city} onChange={handleShipping} />
          </div>
          <div className="cart__shipping-input-box">
            <label className="cart__shipping-label">Zip Code</label>
            <input type="text" name="zipCode" className="cart__shipping-input" value={shippingData.zipCode} onChange={handleShipping} />
          </div>
          <div className="cart__shipping-input-box">
            <label className="cart__shipping-label">Country</label>
            <input type="text" name="country" className="cart__shipping-input" value={shippingData.country} onChange={handleShipping} />
          </div>
          <div className="cart__shipping-input-box">
            <label className="cart__shipping-label">Phone</label>
            <input type="number" name="phone" className="cart__shipping-input" value={shippingData.phone} onChange={handleShipping} />
          </div>
        </form>
      </div>
      <button className="cart__button-order cart__button-order--shipping" onClick={handleShippingWrapper}>Shipping</button>
      <StripeCheckout
        ComponentClass="div"
        stripeKey={'pk_test_51H4BUDKgpGw8RTyJOmzDcz6E4HWWiglzpRFeKtKur4YbHQhPbArf5ZL0wkDN8PrPptMFv7Vq7LmP95iYRrlk4YxY00ROLDorZV'}
        token={handleCheckout}
        name='Nike'
        amount={Math.round(totalPrice * 100)}
        currency='PLN'
        disabled={checkoutValidation}
      >
        <button className="cart__button-order cart__button-order--checkout" style={{ pointerEvents: loading.loader ? 'none' : 'auto' }} disabled={loading.disabledBtn} onClick={handleOrderMsg}>
          {loading.loader ? <Loader /> : 'Checkout'}
        </button>
      </StripeCheckout>
      {orderMsg.msg && <span className="cart__order-message" style={{ color: orderMsg.color }}>{orderMsg.msg}</span>}
    </div>
  )
}

export default Order
