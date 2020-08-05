import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PageTransition from '../components/page-transition/PageTransition';
import { addToCart, removeFromCart, removeFromCartAll, emptyBasket } from '../actions/cartActions';
import Summary from '../components/cart/Summary';
import CartProduct from '../components/cart/CartProduct';
import CartHeader from '../components/cart/CartHeader';
import CartEmpty from '../components/cart/CartEmpty';
import Order from '../components/cart/Order';

const ShoppingCart = ({ cart, user, emptyBasket, addToCart, removeFromCart, removeFromCartAll, history }) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [quantityItems, setQuantityItems] = useState(null);
  const [shippingData, setShippingData] = useState({ address: '', city: '', zipCode: '', country: '', phone: '', });
  const [checkoutValidation, setCheckoutValidation] = useState(true);
  const [orderMsg, setOrderMsg] = useState({ msg: '', color: '' });
  const [loading, setLoading] = useState({ disabledBtn: false, loader: false, });

  const checkoutTimeout = useRef(null);

  useEffect(() => {
    setTotalPrice(state => +(cart.reduce((prev, curr) => prev + (curr.price.value * curr.quantity), 0)).toFixed(2));
    setQuantityItems(state => cart.reduce((prev, curr) => prev + curr.quantity, 0));
  }, [cart]);

  useEffect(() => {
    const { address, city, zipCode, country, phone } = shippingData;
    clearTimeout(checkoutTimeout.current)
    checkoutTimeout.current = setTimeout(() => {
      if (!user.isAuthenticated) return setCheckoutValidation(true);
      if (address && city && zipCode && country && phone) setCheckoutValidation(false);
      else setCheckoutValidation(true);
    }, 500)
  }, [shippingData, user.isAuthenticated])

  const handleCheckout = useCallback(async (token) => {
    if (!user.isAuthenticated) return setOrderMsg({ msg: 'Please log in to place an order', color: '#bd0000' });
    const { address, city, zipCode, country, phone } = shippingData;
    if (!address || !city || !zipCode || !country || !phone) return setOrderMsg({ msg: 'Please complete the shipping details', color: '#bd0000' });
    const orderData = {
      total: totalPrice,
      userId: user._id,
      email: user.email,
      products: cart,
      shipping: { address, city, zipCode, country, phone },
      token,
    }
    try {
      setLoading({ loader: true, disabledBtn: true });
      const response = await axios.post('/api/orders', orderData, { withCredentials: true });
      setLoading(state => ({ ...state, loader: false }));
      setOrderMsg({ msg: response.data.msg, color: '#008000' });
      setTimeout(() => history.push({
        pathname: '/order-confirmation',
        state: { order: response.data.order, },
      }), 1000);
      setTimeout(() => emptyBasket(), 2000);
    } catch (err) {
      setLoading({ loader: false, disabledBtn: false });
      setOrderMsg({ msg: err.response.data.msg, color: '#bd0000' });
      throw err;
    }
  }, [cart, emptyBasket, history, shippingData, totalPrice, user._id, user.email, user.isAuthenticated]);

  const handleShipping = useCallback((e) => {
    e.persist();
    setShippingData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleOrderMsg = useCallback(() => {
    if (!user.isAuthenticated) return setOrderMsg({ msg: 'Please log in to place an order', color: '#bd0000' });
    if (checkoutValidation) setOrderMsg({ msg: 'Please complete the shipping details', color: '#bd0000' })
    else setOrderMsg({ msg: '', color: '' });
  }, [checkoutValidation, user.isAuthenticated]);

  return (
    <PageTransition>
      <div className="cart">
        {cart.length ? <>
          <CartHeader totalPrice={totalPrice} quantityItems={quantityItems} />
          <div className="cart__products">
            {cart.map((product, i) => (
              <CartProduct key={i} product={product} addToCart={addToCart} removeFromCart={removeFromCart} removeFromCartAll={removeFromCartAll} />
            ))}
          </div>
          <Summary totalPrice={totalPrice} />
          <Order totalPrice={totalPrice} handleCheckout={handleCheckout} handleShipping={handleShipping} shippingData={shippingData} checkoutValidation={checkoutValidation} handleOrderMsg={handleOrderMsg} orderMsg={orderMsg} loading={loading} />
          <div className="cart__testing-cards">
            <p className="cart__testing-cards-info">This is a test mode of the payment system. To place an order, use one of the payment card numbers given below.</p>
            <div className="cart__testing-card cart__testing-card--visa">
              <img src={require('../assets/shopping-cart/visa.svg')} alt="visa" className="cart__testing-card-image" />
              Visa - 4242 4242 4242 4242</div>
            <div className="cart__testing-card cart__testing-card--mastercard">
              <img src={require('../assets/shopping-cart/mastercard.svg')} alt="mastercard" className="cart__testing-card-image cart__testing-card-image--mastercard" />
              Mastercard - 5555 5555 5555 4444</div>
            <div className="cart__testing-card cart__testing-card--visa">
              <img src={require('../assets/shopping-cart/visa.svg')} alt="visa" className="cart__testing-card-image" />
              Visa PL - 4000 0061 6000 0005</div>
          </div>
        </> : <CartEmpty />}
      </div>
    </PageTransition>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  removeFromCartAll,
  emptyBasket,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
