import { useEffect } from 'react';
import gsap from 'gsap';

const useHoverEffect = (selectors) => {
  useEffect(() => {
    if (!selectors) return;
    const items = document.querySelectorAll(`${selectors}`);
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
  }, [selectors])
}

export default useHoverEffect
