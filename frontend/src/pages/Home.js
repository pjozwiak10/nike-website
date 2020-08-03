import React from 'react';
import PageTransition from '../components/page-transition/PageTransition';
import Banner from '../components/home/Banner';
import HotspotBanner from '../components/home/HotspotBanner';
import Reveals from '../components/home/Reveals';

const Home = () => {
  return (
    <PageTransition>
      <div className="home">
        <Banner />
        <HotspotBanner />
        <Reveals />
      </div>
    </PageTransition>
  )
}

export default Home;
