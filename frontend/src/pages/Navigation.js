import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../components/navigation/Menu';
import Search from '../components/navigation/Search';
import { useMediaQuery } from 'react-responsive';
import useHoverEffect from '../hooks/useHoverEffect';

const Navigation = ({ history, cart }) => {
  const [menuState, setMenuState] = useState(null);
  const [searchState, setSearchState] = useState(null);
  const [quantityCart, setQuantityCart] = useState(null);

  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  useHoverEffect(isLaptop ? ['.nav__navbar-link', '.nav__menu-link', '.nav__social-media-link'] : null);

  useEffect(() => {
    setQuantityCart(state => cart.reduce((prev, curr) => prev + curr.quantity, 0));
  }, [cart])

  useEffect(() => {
    history.listen(() => {
      setMenuState(false);
    });
  }, [history])

  const showSearch = () => {
    setSearchState(true);
    if (menuState) setMenuState(false);
  }

  return (
    <nav className="nav">
      <span className="nav__additional-border"></span>
      <ul className="nav__navbar">
        <li className="nav__navbar-item nav__navbar-item--logo">
          <Link to="/" className="nav__navbar-link nav__navbar-link--logo">
            <img className="nav__logo" src={require('../assets/navigation/logo.svg')} alt="logo" />
          </Link>
        </li>
        <li className="nav__navbar-item">
          <button className="nav__navbar-link rotate" onClick={isLaptop ? () => setSearchState(!searchState) : showSearch}>
            {isLaptop ? 'Search' : <i className="fas fa-search nav__icon-link"></i>}
          </button>
        </li>
        <li className="nav__navbar-item">
          <Link to="/shopping-cart" className="nav__navbar-link rotate">
            {isLaptop ? 'Cart' : <i className="fas fa-shopping-cart nav__icon-link"></i>}
            {isLaptop && quantityCart > -1 && <span className='nav__quantity-cart'>({quantityCart})</span>}
          </Link>
          {!isLaptop && quantityCart > 0 && <span className='nav__quantity-cart'>{quantityCart}</span>}
        </li>
        {!isLaptop && <li className="nav__navbar-item">
          <button className="nav__navbar-link rotate" onClick={() => setMenuState(!menuState)}>
            <i className="fas fa-compass nav__icon-link"></i>
          </button>
        </li>}
        <li className="nav__navbar-item">
          <Link to="/account" className="nav__navbar-link rotate">
            {isLaptop ? 'Nike+' : <i className="fas fa-user nav__icon-link"></i>}
          </Link>
        </li>
        {isLaptop && <Menu menuState={menuState} />}
      </ul>
      {!isLaptop && <Menu menuState={menuState} />}
      <Search searchState={searchState} setSearchState={setSearchState} />
    </nav>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, null)(withRouter(Navigation));
