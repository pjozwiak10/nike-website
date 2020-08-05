import React, { useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTransition from '../components/page-transition/PageTransition';

const OrderConfirmation = ({ history }) => {
  const orderInfo = useRef(history.location.state ? history.location.state.order : null);
  return (
    <PageTransition>
      {orderInfo.current ? <div className="order-confirmation">
        <picture className="order-confirmation__picture">
          <source media="(min-width: 1024px)" srcSet={require('../assets/order-confirmation/confirmation-desktop.jpg')} />
          <source media="(min-width: 768px)" srcSet={require('../assets/order-confirmation/confirmation-mobile.jpg')} />
          <source media="(min-height: 740px)" srcSet={require('../assets/order-confirmation/confirmation-mobile-xl.jpg')} />
          <img className="order-confirmation__background" src={require('../assets/order-confirmation/confirmation-mobile.jpg')} alt="order-confirmation-background" />
        </picture>
        <div className="order-confirmation__content">
          <h1 className="order-confirmation__headline">Thank you for being with us</h1>
          <p className="order-confirmation__info">Your order <strong>{orderInfo.current.orderNumber}</strong> has been accepted for processing.</p>
          <Link to="/" className="order-confirmation__return-button">Return Home</Link>
        </div>
      </div> : <Redirect to="/" />}
    </PageTransition>
  )
}

export default OrderConfirmation
