import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { connect, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import gsap from 'gsap';
import PageTransition from '../components/page-transition/PageTransition';
import ProductGallery from '../components/product/ProductGallery';
import products from '../data/products';
import Variants from '../components/product/Variants';
import Sizes from '../components/product/Sizes';
import Hotspot from '../components/product/Hotspot';
import ProductPopup from '../components/product/ProductPopup';
import Opinions from '../components/product/Opinions';
import useHoverEffect from '../hooks/useHoverEffect';

const Product = ({ match, addToCart }) => {
  const user = useSelector(state => state.user);
  const windowSize = useSelector(state => state.windowSize);
  const [product, setProduct] = useState(null);
  const [hotspotProducts, setHotspotProducts] = useState(null);
  const [stateSize, setStateSize] = useState(null);
  const [disabledClick, setDisabledClick] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [favourite, setFavourite] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRate, setAverageRate] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [opinionsDialogue, setOpinionsDialogue] = useState(false);
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const productId = useRef(null);

  useHoverEffect(isLaptop ? ['.product__sizes-guide-button', '.opinions__add', '.opinions__dialogue-close', '.product__sizes-guide-close'] : null);

  useEffect(() => {
    productId.current = match.params.productId;
    setProduct(state => {
      const searchedProduct = products.find(product => product.id === +productId.current);
      handleHotspotProducts(searchedProduct);
      return {
        ...searchedProduct,
        variants: searchedProduct.variants.map(variant => {
          const searchedVariant = products.find(product => product.id === variant.id);
          return { id: searchedVariant.id, link: searchedVariant.link, image: searchedVariant.images[0], date: searchedVariant.date }
        }).sort((a, b) => new Date(b.date) - new Date(a.date)),
      };
    });
    const handleHotspotProducts = (searchedProduct) => {
      const allHotspotProducts = products.filter(product => {
        const includeCategory = product.categories.some(category => searchedProduct.categories.includes(category));
        const differentProduct = product.link !== searchedProduct.link;
        let sameSex;
        switch (searchedProduct.sex) {
          case 'unisex':
            sameSex = true;
            break;
          default:
            sameSex = product.sex === searchedProduct.sex || product.sex === 'unisex' ? true : false;
        }
        if (differentProduct && includeCategory && sameSex) return true;
        else return false;
      });
      for (let i = allHotspotProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allHotspotProducts[i], allHotspotProducts[j]] = [allHotspotProducts[j], allHotspotProducts[i]];
      }
      setHotspotProducts(state => allHotspotProducts.filter((product, i) => i < 4));
    }
  }, [match.params.productId]);

  useEffect(() => {
    if (user.isAuthenticated) {
      (async () => {
        const response = await axios.get(`/api/products/wishlist/${productId.current}`, { params: { userId: user._id }, withCredentials: true });
        setFavourite(response.data.product);
      })().catch(err => { throw err; })
    }
  }, [user])

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/reviews/${productId.current}`, { params: { userId: user._id } });
      setReviews(response.data.reviews)
      setAverageRate(state => (response.data.reviews.reduce((prev, curr) => (prev + curr.rate), 0)) / response.data.reviews.length);
      setUserReview(response.data.userReview);
    })().catch(err => { throw err });
  }, [user])

  useEffect(() => {
    if (product && isLaptop) {
      const marginLeft = document.body.clientWidth < 1440 ? 0 : (document.body.clientWidth - 1440) / 2;
      document.documentElement.style.setProperty('--marginLeft', `${marginLeft}px`);
    }
  }, [windowSize, product, isLaptop]);

  const handleSize = (e, size) => {
    if (disabledClick) return;
    setDisabledClick(true);
    setTimeout(() => setDisabledClick(false), 500);
    e.persist();
    if (!stateSize) {
      setStateSize(size)
      gsap.to(e.target, {
        duration: 0.5, background: '#000', border: '1px solid #000', color: '#fff', className: `${e.target.className} active`,
      })
    } else if (size === stateSize) return;
    else {
      setStateSize(size)
      gsap.to(`.${e.target.className}.active`, {
        duration: 0.4, background: '#fff', border: '1px solid #ddd', color: '#000', className: `${e.target.className}`,
        onComplete: () => gsap.to(e.target, {
          duration: 0.4, background: '#000', border: '1px solid #000', color: '#fff', className: `${e.target.className} active`,
        })
      })
    }
  }

  const handleAddProduct = () => {
    if (!stateSize) {
      setPopupMsg('Please choose size to add the product to the cart');
      return;
    };
    addToCart({ ...product, size: stateSize })
    setPopupMsg('added')
  }

  const handleDeletePopup = () => {
    gsap.to('.product__popup', { duration: 0.4, opacity: 0 })
    gsap.to('.product__popup-wrapper', { duration: 0.4, opacity: 0, delay: 0.4, onComplete: () => setPopupMsg(''), })
  }

  const addToFav = async () => {
    if (!user.isAuthenticated) return setPopupMsg('You have to be logged in to add the product to favourites');
    try {
      const response = await axios.post(`/api/products/wishlist/${productId.current}`, { userId: user._id }, { withCredentials: true });
      setFavourite(response.data.product);
      setPopupMsg('Product added to favourites')
    } catch (err) {
      throw err;
    }
  }

  const removeFromFav = async () => {
    try {
      await axios.delete(`/api/products/wishlist/${productId.current}`, { data: { userId: user._id }, withCredentials: true });
      setFavourite(null);
      setPopupMsg('Product removed from favourites')
    } catch (err) {
      throw err;
    }
  }

  const handleOpinionsDialogue = () => {
    if (!user.isAuthenticated) return setPopupMsg('You have to be logged in to add the opinion');
    if (!opinionsDialogue) {
      gsap.to('.opinions__dialogue-wrapper', { duration: 0, display: 'flex' });
      gsap.to('.opinions__dialogue-wrapper', { duration: 0.4, opacity: 1, });
      gsap.to('.opinions__dialogue', { duration: 0.4, x: 0, delay: 0.4, onComplete: () => setOpinionsDialogue(true) })
    } else {
      gsap.to('.opinions__dialogue', { duration: 0.4, x: '-100vw' })
      gsap.to('.opinions__dialogue-wrapper', { duration: 0.4, delay: 0.4, opacity: 0 });
      gsap.to('.opinions__dialogue-wrapper', { duration: 0, delay: 0.8, display: 'none', onComplete: () => setOpinionsDialogue(false) });
    }
  }

  const handleOpinionsForm = async (e, opinionsForm, setOpinionsForm, setOpinionsMsg) => {
    e.preventDefault();
    if (!opinionsForm.content) return setOpinionsMsg({ msg: 'Please enter all fields', color: '#bd0000' });
    const data = { userId: user._id, name: user.name, rate: opinionsForm.rate, content: opinionsForm.content };
    try {
      const response = await axios.post(`/api/reviews/${productId.current}`, data, { withCredentials: true });
      setAverageRate(state => ([...reviews, response.data.review].reduce((prev, curr) => (prev + curr.rate), 0)) / [...reviews, response.data.review].length);
      setUserReview(true);
      setReviews(state => ([...state, response.data.review]));
      setOpinionsMsg({ msg: response.data.msg, color: '#008000' });
      setTimeout(() => {
        handleOpinionsDialogue();
        setOpinionsForm({ rate: 5, content: '' });
        setOpinionsMsg({ msg: '', color: '' });
      }, 1000)
    } catch (err) {
      setOpinionsMsg({ msg: err.response.data.msg, color: '#bd0000' })
      throw err;
    }
  }

  return (
    <PageTransition>
      <div className="product">
        <div className="product__returns-info">
          <p className="product__returns-info-text">
            We’ve extended our returns period to 60 days.
          </p>
        </div>
        {product ? <>
          <section className="product__main-info">
            <p className="product__type">{product.type}</p>
            <p className="product__price">{product.price.formatted}</p>
            <p className="product__name">{product.name}</p>
          </section>
          <ProductGallery product={product} isLaptop={isLaptop} isDesktop={isDesktop} />
          <Variants product={product} />
          <Sizes product={product} handleSize={handleSize} isLaptop={isLaptop} />
          <section className="product__main-buttons">
            <button className="product__button-add" onClick={handleAddProduct}>Add To Cart</button>
            {favourite ? <button className="product__button-favourite" onClick={removeFromFav}>Already Added To Favourite<i className="fas fa-heart"></i></button>
              : <button className="product__button-favourite" onClick={addToFav}> Add To Favourite <i className="far fa-heart"></i></button>}
          </section>
          <section className="product__description">
            <p className="product__description-text">{product.description}</p>
            <p className="product__description-color">Colour Shown: {product.colors}</p>
          </section>
          <Opinions handleOpinionsForm={handleOpinionsForm} handleOpinionsDialogue={handleOpinionsDialogue} userReview={userReview} averageRate={averageRate} reviews={reviews} />
          <Hotspot hotspotProducts={hotspotProducts} />
        </> : null}
        {popupMsg && <ProductPopup addedProduct={{ ...product, size: stateSize }} popupMsg={popupMsg} handleDeletePopup={handleDeletePopup} />}
      </div>
    </PageTransition>
  )
}

const mapDispatchToProps = {
  addToCart,
}

export default connect(null, mapDispatchToProps)(Product);
