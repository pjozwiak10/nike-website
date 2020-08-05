import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as JordanLogo } from '../../assets/home/jordan-logo.svg';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';

const HotspotBanner = memo(() => {
  const controlsFirstImage = useAnimation();
  const controlsSecondImage = useAnimation();
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [firstImage, inViewFirstImage] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -200px 0px',
  });
  const [secondImage, inViewSecondImage] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -200px 0px',
  });
  const scrollFadeRight = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  }
  const scrollFadeLeft = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 },
  }
  useEffect(() => {
    if (inViewFirstImage) {
      controlsFirstImage.start('visible');
    }
  }, [inViewFirstImage, controlsFirstImage])
  useEffect(() => {
    if (inViewSecondImage) {
      controlsSecondImage.start('visible');
    }
  }, [inViewSecondImage, controlsSecondImage])

  return (
    <section className="home__hotspot-banner hotspot-banner">
      <h1
        className="hotspot-banner__headline">
        <JordanLogo className="hotspot-banner__headline-logo" />
        <span className="hotspot-banner__headline-text">Always at the point</span>
      </h1>
      <motion.div
        ref={firstImage}
        initial='hidden'
        animate={controlsFirstImage}
        variants={isLaptop ? scrollFadeLeft : scrollFadeRight}
        transition={{ duration: 0.5, type: 'tween' }}
        className="hotspot-banner__image-container">
        <img src={require('../../assets/home/hotspot-banner-1.jpg')} alt="jordan shoes" className="hotspot-banner__image" />
      </motion.div>
      <motion.div
        ref={secondImage}
        initial='hidden'
        animate={controlsSecondImage}
        variants={isLaptop ? scrollFadeRight : scrollFadeLeft}
        transition={{ duration: 0.5, type: 'tween' }}
        className="hotspot-banner__image-container">
        <img src={require('../../assets/home/hotspot-banner-2.jpg')} alt="jordan shoes" className="hotspot-banner__image" />
        <div className="hotspot-banner__link-wrapper">
          <p className="hotspot-banner__link-description">Jordan Collection</p>
          <Link to="/c/jordan" className="hotspot-banner__link">View</Link>
        </div>
      </motion.div>
    </section>
  )
});

export default HotspotBanner;
