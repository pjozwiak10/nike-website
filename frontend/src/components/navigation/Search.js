import React, { useEffect, useState, useRef, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Search = ({ searchState, setSearchState, history }) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const timeoutSearch = useRef(null);

  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    if (searchState) {
      document.querySelector('.nav__search-input').focus();
      if (isLaptop) {
        gsap.to('.nav__search', { duration: 0, display: 'grid' });
        gsap.to('.nav__search', { duration: 0.5, opacity: 1 });
      } else {
        gsap.to('.nav__search', { duration: 0.5, x: '0%', delay: 0.1, })
        document.body.style.overflow = 'hidden';
      }
    } else if (!searchState && searchState !== null) {
      if (isLaptop) {
        gsap.to('.nav__search', { duration: 0.5, opacity: 0 });
        gsap.to('.nav__search', {
          duration: 0, display: 'none', delay: 0.5, onComplete: () => {
            setSearchInput('');
            setSearchedProducts([]);
            clearInterval(timeoutSearch.current);
          }
        });
      } else {
        gsap.to('.nav__search', { duration: 0.5, x: '100%', delay: 0.1, });
        document.body.style.overflow = 'visible';
      }
    }
  }, [searchState, isLaptop])

  const hideSearch = useCallback(() => {
    setSearchState(false);
    setTimeout(() => {
      setSearchedProducts([]);
      setSearchInput('')
    }, 500);
  }, [setSearchState, setSearchInput, setSearchedProducts]);

  useEffect(() => {
    history.listen(() => {
      hideSearch();
      clearTimeout(timeoutSearch.current);
    })
  }, [history, hideSearch]);

  useEffect(() => {
    if (searchedProducts.length) {
      gsap.to('.nav__search-products', { opacity: 1, y: 0, duration: 0.5, delay: 0.2, });
      gsap.to('.nav__search-link', { opacity: 1, y: 0, duration: 0.5, delay: 0.2, });
    }
  }, [searchedProducts])

  const handleSearchInputEnter = (e) => {
    if (e.keyCode === 13 && searchInput) {
      history.push(`/search/s=${searchInput}`);
    }
  }

  const handleSearchInput = (e) => {
    const formattedValue = e.target.value.trim().toLowerCase();
    setSearchInput(e.target.value);
    clearTimeout(timeoutSearch.current);
    if (!formattedValue) return setSearchedProducts([]);
    timeoutSearch.current = setTimeout(() => {
      if (!formattedValue) return setSearchedProducts([]);
      const searchedProducts = require('../../data/products').default.filter(product => product.name.toLowerCase().includes(formattedValue) || product.colors.toLowerCase().includes(formattedValue) || product.type.toLowerCase().includes(formattedValue) || product.categories.some(category => category.toLowerCase().includes(formattedValue))).sort((a, b) => new Date(b.date) - new Date(a.date));
      setSearchedProducts(searchedProducts);
    }, 1000)
  }

  return (
    <div className="nav__search">
      <div className="nav__search-result">
        {searchedProducts.length ? <>
          <div className="nav__search-products">
            {searchedProducts.map((product, i) => (i < 6) ?
              <div className="nav__search-product" key={i}>
                <Link to={`/${product.link}/id=${product.id}`} className="nav__search-product-link">
                  <div className="nav__search-image-container">
                    <img src={product.images[0]} alt={product.name} className={`nav__search-image nav__search-image${product.className}`} />
                  </div>
                  <div className="nav__search-description">
                    <p className="nav__search-description-text nav__search-description-text--name">{product.name}</p>
                    <p className="nav__search-description-text nav__search-description-text--type">{product.type}</p>
                    <p className="nav__search-description-text">{product.price.formatted}</p>
                  </div>
                </Link>
              </div>
              : null)}
          </div>
          <Link to={`/search/s=${searchInput}`} className="nav__search-link">View All<span>({searchedProducts.length})</span><i className="fas fa-angle-right"></i></Link>
        </> : null
        }
      </div >
      <div className="nav__search-input-container">
        {searchInput ? <Link to={`/search/s=${searchInput}`} className="nav__search-link-icon"><i className="fas fa-search"></i></Link>
          : <span className="nav__search-link-icon"><i className="fas fa-search"></i></span>}
        <input type="text" value={searchInput} onKeyDown={handleSearchInputEnter} onChange={handleSearchInput} className="nav__search-input" placeholder="Search" />
        {!isLaptop && <button className="nav__search-close" onClick={hideSearch}>X</button>}
      </div>
    </div >
  )
}

export default withRouter(Search);
