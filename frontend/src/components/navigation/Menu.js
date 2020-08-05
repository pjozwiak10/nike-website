import React, { useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Menu = memo(({ menuState }) => {
  const menuTl = useRef(null);

  useEffect(() => {
    menuTl.current = gsap.timeline();
  }, [])

  useEffect(() => {
    if (menuState) {
      menuTl.current.to('.nav__additional-border', {
        duration: 0,
        scaleX: 1,
      }).to('.nav__menu', {
        duration: 0.5,
        delay: 0.1,
        y: '0%',
      })
    } else if (!menuState && menuState !== null) {
      menuTl.current.to('.nav__menu', {
        duration: 0.5,
        delay: 0.1,
        y: '100.5%',
      }).to('.nav__additional-border', {
        duration: 0,
        scaleX: 0,
      })
    }
  }, [menuState])

  return (
    <div className="nav__menu">
      <div className="nav__social-media">
        <a href="https://www.facebook.com/" className="nav__social-media-link">
          <i className="fab fa-facebook-square nav__social-media-icon"></i>
        </a>
        <a href="https://www.instagram.com/" className="nav__social-media-link">
          <i className="fab fa-instagram nav__social-media-icon"></i>
        </a>
        <a href="https://twitter.com/explore" className=" nav__social-media-link">
          <i className="fab fa-twitter nav__social-media-icon"></i>
        </a>
      </div>
      <ul className="nav__menu-list">
        <li className="nav__menu-list-item">
          <Link to="/c/man" className="nav__menu-link rotate">man</Link>
        </li>
        <li className="nav__menu-list-item">
          <Link to="/c/woman" className="nav__menu-link rotate">woman</Link>
        </li>
        <li className="nav__menu-list-item">
          <Link to="/c/shoes" className="nav__menu-link rotate">shoes</Link>
        </li>
        <li className="nav__menu-list-item nav__menu-list-item--last">
          <Link to="/c/kits" className="nav__menu-link rotate">kits</Link>
        </li>
      </ul>
    </div>
  )
});

export default Menu
