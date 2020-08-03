import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1,
  }

  return (
    <motion.div
      className="page-transition"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition;
