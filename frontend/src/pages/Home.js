import React, { lazy, Suspense } from 'react';
import PageTransition from '../components/page-transition/PageTransition';
const Banner = lazy(() => import('../components/home/Banner'));
const HotspotBanner = lazy(() => import('../components/home/HotspotBanner'));
const Reveals = lazy(() => import('../components/home/Reveals'));

const Home = () => {
  return (
    <PageTransition>
      <div className="home">
        <Suspense fallback>
          <Banner />
          <HotspotBanner />
          <Reveals />
        </Suspense>
      </div>
    </PageTransition>
  )
}

export default Home;
