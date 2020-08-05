import React, { useEffect, useState, memo } from 'react';
import { motion, useSpring, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Reveal = memo(({ reveal }) => {
  const xDrag = useSpring(0, { stiffness: 1000, damping: 1000 });
  const fadeIn = useTransform(xDrag, [0, -150], [0.8, 1]);
  const fadeOut = useTransform(xDrag, [0, -150], [0.25, 0]);
  const logoUp = useTransform(xDrag, [0, -150], [0, -50]);
  const modelInfoDown = useTransform(xDrag, [0, -150], [0, 50]);
  const modelScale = useTransform(xDrag, [0, -150], [1, 1.2]);
  const dragInfoLeft = useTransform(xDrag, [0, -150], [0, -50]);
  const dragInfoFadeOut = useTransform(xDrag, [0, -150], [0.5, 0]);
  const linkFadeOut = useTransform(xDrag, [0, -150], [0.75, 0]);
  const linkRight = useTransform(xDrag, [0, -150], [0, 50]);
  const [stateDisplayLink, setStateDisplayLink] = useState(true);
  const controls = useAnimation();
  const [refReveal, inCenterView] = useInView({
    threshold: 0.8,
  })
  const [refRevealOnce, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -200px 0px',
  })
  useEffect(() => {
    if (!inCenterView) {
      xDrag.stop();
      xDrag.set(0);
    }
  }, [inCenterView, xDrag]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  useEffect(() => {
    xDrag.onChange(() => {
      xDrag.get() > -150 ? setStateDisplayLink(true) : setStateDisplayLink(false);
    })
  }, [stateDisplayLink, xDrag])

  const scrollFade = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial='hidden'
      animate={controls}
      variants={scrollFade}
      transition={{ duration: 0.5, type: 'tween' }}
      className={`reveals__reveal reveals__reveal--${reveal.className}`}
      ref={refRevealOnce}>
      <motion.div
        ref={refReveal}
        style={{ opacity: fadeIn, backgroundColor: reveal.backgroundColor }}
        className="reveals__additional-background"
      ></motion.div>
      <motion.div style={{ opacity: dragInfoFadeOut, x: dragInfoLeft }} className="reveals__drag-info"><i className="fas fa-angle-left reveals__drag-icon"></i>Drag To Enlarge</motion.div>
      <motion.div style={{ opacity: linkFadeOut, x: linkRight, display: stateDisplayLink ? 'block' : 'none' }} className="reveals__product-link">
        <Link to={reveal.link}>View</Link>
      </motion.div>
      <motion.div style={{ opacity: fadeOut, y: logoUp }} className="reveals__logo-container">
        <img src={require('../../assets/home/nike-just-do-it.svg')} alt="nike-logo" className="reveals__logo" />
      </motion.div>
      <motion.div style={{ opacity: fadeOut, y: modelInfoDown }} className="reveals__model-info">
        <p className="reveals__model-year">2020</p>
        <p className="reveals__model-name">{reveal.modelName}</p>
        <p className="reveals__model-subname">{reveal.modelSubname}</p>
      </motion.div>
      <motion.div drag={inCenterView ? 'x' : undefined} style={{ x: xDrag, scale: modelScale }} dragConstraints={{ left: reveal.left, right: 0 }} dragElastic={0.05} className="reveals__image-drag">
        <img src={require(`../../assets/home/${reveal.img}`)} alt="nike-flease" className="reveals__image" />
      </motion.div>
    </motion.div>
  )
});

export default Reveal
