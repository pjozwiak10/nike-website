import React from 'react';
import Swiper from 'react-id-swiper';

const Banner = () => {
  const params = {
    containerClass: 'swiper-container banner__swiper',
    loop: true,
    speed: 750,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination.banner__pagination',
      clickable: true,
      bulletClass: 'banner__bullet',
      bulletActiveClass: 'banner__bullet--active',
    }
  }
  return (
    <section className="home__banner banner">
      <Swiper {...params}>
        <div className="banner__slide">
          <h1 className="banner__slogan">
            <span className="banner__slogan-text">find your</span>
            <span className="banner__slogan-text">greatness.</span>
          </h1>
          <img src={require('../../assets/home/banner-1.jpg')} alt="greatness" className="banner__image" />
        </div>
        <div className="banner__slide">
          <h1 className="banner__slogan banner__slogan--middle">
            <span className="banner__slogan-text">greatness</span>
            <span className="banner__slogan-text">is not born.</span>
            <span className="banner__slogan-text">it's made.</span>
          </h1>
          <img src={require('../../assets/home/banner-2.jpg')} alt="greatness" className="banner__image" />
        </div>
        <div className="banner__slide">
          <h1 className="banner__slogan banner__slogan--last">
            <span className="banner__slogan-text">greatness</span>
            <span className="banner__slogan-text">doesn't</span>
            <span className="banner__slogan-text">need an</span>
            <span className="banner__slogan-text">audience.</span>
          </h1>
          <img src={require('../../assets/home/banner-3.jpg')} alt="greatness" className="banner__image banner__image--position" />
        </div>
      </Swiper>
    </section>
  )
}

export default Banner
