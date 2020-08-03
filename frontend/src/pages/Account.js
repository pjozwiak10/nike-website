import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { logout } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import PageTransition from '../components/page-transition/PageTransition';
import products from '../data/products';
import Buttons from '../components/account/Buttons';
import Favourites from '../components/account/Favourites';
import Reviews from '../components/account/Reviews';
import Orders from '../components/account/Orders';
import useHoverEffect from '../hooks/useHoverEffect';

const Account = ({ history }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeContent, setActiveContent] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [editReview, setEditReview] = useState({ _id: null, content: null, rate: null, });
  const [activeOrder, setActiveOrder] = useState(null);

  const accountTl = useRef(null);

  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  useHoverEffect(isLaptop ? ['.account__favourite-remove', '.account__review-button', '.account__rate-button', '.account__order-button', '.account__order-details-close', '.account__review-product-name a'] : null);

  useEffect(() => {
    accountTl.current = gsap.timeline();
  }, [])

  useEffect(() => {
    (async () => {
      const fetchReviews = axios.get('/api/reviews/', { params: { userId: user._id }, withCredentials: true });
      const fetchFavourites = axios.get('/api/products/wishlist', { params: { userId: user._id }, withCredentials: true });
      const fetchOrders = axios.get('/api/orders', { params: { userId: user._id }, withCredentials: true });
      const [resReviews, resFavourites, resOrders] = await Promise.all([fetchReviews, fetchFavourites, fetchOrders]);
      setReviews(state => resReviews.data.reviews.map(review => ({
        ...review,
        productData: (() => {
          const { name, link } = products.find(product => product.id === review.productId);
          return { name, link }
        })(),
      })));
      setFavourites(state => resFavourites.data.products.map(favourite => {
        const { id, link, name, type, price, images } = products.find(product => product.id === favourite.productId);
        return { id, link, name, type, price, image: images[0] };
      }));
      setOrders(state => resOrders.data.orders.map(order => {
        const orderProducts = order.products.map(orderProduct => {
          const { id, link, name, type, price, images } = products.find(product => product.id === orderProduct.productId);
          return { id, link, name, type, price, image: images[0], _id: orderProduct.product, size: orderProduct.size, quantity: orderProduct.quantity };
        });
        return { ...order, products: orderProducts };
      }));
    })().catch(err => { throw err; });
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    history.push({
      state: 'home',
    });
  }

  const handleShowContent = (e) => {
    setDisabledBtn(true);
    const id = e.target.dataset.id;
    const heightToTranslate = e.target.offsetTop;
    if (activeContent) {
      switch (id) {
        case activeContent:
          accountTl.current.to(`.account__${id}`, { duration: 0.5, opacity: 0, })
            .to(`.account__${id}`, { duration: 0, display: 'none', })
            .to('.account__buttons-background', { duration: 0.5, scaleX: 0, }, '-=0.5')
            .to(`.account__button--${id}`, { duration: 0.5, color: '#000', }, '-=0.5')
            .to('.account__content-background', { duration: 0.5, opacity: 0, onComplete: () => { setActiveContent(null); setDisabledBtn(false) }, }, '-=0.5')
          break;
        default:
          accountTl.current.to('.account__buttons-background', { duration: 0.5, y: heightToTranslate, })
            .to(`.account__button--${activeContent}`, { duration: 0.5, color: '#000', }, '-=0.5')
            .to(`.account__button--${id}`, { duration: 0.5, color: '#fff', onComplete: () => { setActiveContent(id); setDisabledBtn(false) }, }, '-=0.5')
            .to(`.account__${activeContent}`, { duration: 0.5, opacity: 0, }, '-=0.5')
            .to(`.account__${activeContent}`, { duration: 0, display: 'none', })
            .to(`.account__${id}`, { duration: 0, display: 'grid', })
            .to(`.account__${id}`, { duration: 0.5, opacity: 1, })
          break;
      }
    } else {
      accountTl.current.to('.account__buttons-background', { duration: 0, y: heightToTranslate, })
        .to('.account__buttons-background', { duration: 0.5, scaleX: 1, })
        .to(`.account__button--${id}`, { duration: 0.5, color: '#fff', }, '-=0.5')
        .to('.account__content-background', { duration: 0.5, opacity: 1, }, '-=0.5')
        .to(`.account__${id}`, { duration: 0, display: 'grid', })
        .to(`.account__${id}`, { duration: 0.5, opacity: 1, onComplete: () => { setActiveContent(id); setDisabledBtn(false) }, })
    }
  }

  const handleRemoveFavourite = async (productId) => {
    try {
      await axios.delete(`/api/products/wishlist/${productId}`, { data: { userId: user._id }, withCredentials: true })
      setFavourites(state => state.filter(product => product.id !== productId));
    } catch (err) {
      throw err;
    }
  }

  const handleEditReview = (_id, content, rate) => setEditReview({ _id, content, rate });
  const handleCancelReview = () => setEditReview({ _id: null, content: null, rate: null });
  const handleIncreaseRate = () => setEditReview(state => ({ ...state, rate: state.rate < 5 ? state.rate + 0.5 : state.rate }))
  const handleDecreaseRate = () => setEditReview(state => ({ ...state, rate: state.rate > 1 ? state.rate - 0.5 : state.rate }))

  const handleChangeReview = (e, value) => {
    e.persist()
    setEditReview(state => ({
      ...state,
      [e.target.dataset.id]: value,
    }))
  }

  const handleConfirmReview = async () => {
    try {
      const { _id, content, rate } = editReview
      await axios.patch('/api/reviews', { reviewId: _id, rate, content }, { withCredentials: true });
      setReviews(state => state.map(review => review._id === editReview._id ? { ...review, content, rate } : review));
      setEditReview({ _id: null, content: null, rate: null })
    } catch (err) { throw err; }
  }

  const handleDeleteReview = async (_id) => {
    try {
      await axios.delete('/api/reviews', { data: { reviewId: _id }, withCredentials: true });
      setReviews(state => state.filter(review => review._id !== _id));
    } catch (err) { throw err; }
  }

  const handleActiveOrder = (_id) => {
    if (activeOrder) {
      gsap.to('.account__order-details', { duration: 0.5, x: '100%', onComplete: () => setActiveOrder(null) });
    } else {
      setActiveOrder(state => orders.find(order => order._id === _id));
      gsap.to('.account__order-details', { duration: 0.5, x: 0, delay: 0.2, });
    }
  }

  return (
    <PageTransition>
      <div className="account">
        <div className="account__user-data">
          <p className="account__user-name">{user.name}</p>
          <p className="account__user-register">A member of the Nike community since
          <span>{(new Date(user.registerDate).toDateString()).slice(4)}</span></p>
          <button className="account__logout" onClick={handleLogout}>Logout</button>
        </div>
        <div className="account__main">
          <div className="account__buttons">
            <span className="account__buttons-background"></span>
            <Buttons handleShowContent={handleShowContent} disabledBtn={disabledBtn} />
          </div>
          <div className="account__content-wrapper">
            <span className="account__content-background"></span>
            <Favourites handleRemoveFavourite={handleRemoveFavourite} favourites={favourites} />
            <Reviews reviews={reviews} editReview={editReview} handleEditReview={handleEditReview} handleChangeReview={handleChangeReview} handleCancelReview={handleCancelReview} handleConfirmReview={handleConfirmReview} handleDeleteReview={handleDeleteReview} handleIncreaseRate={handleIncreaseRate} handleDecreaseRate={handleDecreaseRate} />
            <Orders orders={orders} handleActiveOrder={handleActiveOrder} activeOrder={activeOrder} />
          </div>
        </div>
      </div>
    </PageTransition >
  )
}

export default Account
