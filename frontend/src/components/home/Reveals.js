import React, { useRef, memo, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import useHoverEffect from '../../hooks/useHoverEffect';
const Reveal = lazy(() => import('./Reveal'));

const Reveals = memo(() => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  useHoverEffect(isLaptop ? ['.reveals__product-link'] : null);
  const reveals = useRef([
    {
      img: 'reveal-flyease.png', modelName: 'air max 90', modelSubname: 'flyease', left: isTablet ? (isDesktop ? -1450 : -1075) : -700, backgroundColor: '#C4A975', className: 'flyease',
      link: '/nike-air-max-90-flyease/id=1'
    },
    {
      img: 'reveal-lebron.png', modelName: 'lebron', modelSubname: '17', left: isTablet ? (isDesktop ? -1250 : -900) : -530, backgroundColor: '#EC022B', className: 'lebron',
      link: '/nike-lebron-17/id=18'
    },
    {
      img: 'reveal-dubzero.png', modelName: 'air jordan', modelSubname: 'dub zero', left: isTablet ? (isDesktop ? -1300 : -925) : -550, backgroundColor: '#2D292C', className: 'dubzero',
      link: '/nike-air-jordan-dub-zero/id=21'
    },
  ])

  return (
    <section className="home__reveals reveals">
      <h1 className="reveals__headline">New reveals</h1>
      <Suspense fallback>
        {reveals.current.map(reveal => (
          <Reveal reveal={reveal} key={reveal.modelName} />
        ))}
      </Suspense>
    </section>
  )
});

export default Reveals;
