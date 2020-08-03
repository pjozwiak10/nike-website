import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '../actions/windowActions';

function optimizeResize(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  }
}

const useWindowSize = () => {
  const dispatch = useDispatch();
  const windowSize = useSelector(state => state.windowSize);
  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  useEffect(() => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const handleResize = optimizeResize(() => {
      dispatch(setWindowSize(getSize()));
    }, 1000);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch, windowSize]);
}

export default useWindowSize;

