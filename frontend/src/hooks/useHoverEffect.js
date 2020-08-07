import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const useHoverEffect = (selectors) => {
  const selectorsRef = useRef(selectors);
  const waitForElements = useCallback((elements, time) => {
    if (document.querySelectorAll(elements).length > 0) {
      const items = document.querySelectorAll(elements);
      const handleHoverEffect = (e, el) => {
        const { offsetX: x, offsetY: y } = e;
        const { offsetWidth: width, offsetHeight: height } = el;
        const move = 5;
        const xMove = x / width * (move * 2) - move;
        const yMove = y / height * (move * 2) - move;
        if (el.className.includes('rotate')) gsap.to(el, { duration: 0.3, x: yMove, y: -xMove, rotate: '-90deg' });
        else gsap.to(el, { duration: 0.3, x: xMove, y: yMove });
        gsap.to('.cursor__ball--big', { duration: 0.5, scale: 2.25 });
        if (e.type === 'mouseleave') {
          if (el.className.includes('rotate')) gsap.to(el, { duration: 0.3, x: 0, y: 0, rotate: '-90deg' });
          else gsap.to(el, { duration: 0.3, x: 0, y: 0 });
          gsap.to('.cursor__ball--big', { duration: 0.5, scale: 1 });
        };
      };
      items.forEach(el => el.addEventListener('mousemove', (e) => handleHoverEffect(e, el)));
      items.forEach(el => el.addEventListener('mouseleave', (e) => handleHoverEffect(e, el)));
      return () => {
        items.forEach(el => el.removeEventListener('mousemove', (e) => handleHoverEffect(e, el)));
        items.forEach(el => el.removeEventListener('mouseleave', (e) => handleHoverEffect(e, el)));
      }
    } else {
      setTimeout(() => {
        waitForElements(elements, 500)
      }, time);
    }
  }, [])

  useEffect(() => {
    if (!selectorsRef) return;
    waitForElements(selectorsRef.current, 500);
  }, [waitForElements]);
}

export default useHoverEffect
