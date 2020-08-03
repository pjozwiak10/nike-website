import React from 'react';
import './scss/App.scss';
import useWindowSize from './hooks/useWindowSize';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Navigation from './pages/Navigation';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import SignUpSignIn from './pages/SignUpSignIn';
import Account from './pages/Account';
import PrivateRoute from './router-components/PrivateRoute';
import OrderConfirmation from './pages/OrderConfirmation';
import Cursor from './components/cursor/Cursor';

const App = () => {
  useWindowSize();
  const location = useLocation();
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="wrapper">
      {isLaptop && <Cursor />}
      < Navigation />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Home} />
          <Route exact path='/c/:category' component={ProductsList} />
          <Route exact path='/search/s=:search' component={ProductsList} />
          <Route exact path='/:productName/id=:productId' component={Product} />
          <Route exact path='/shopping-cart' component={ShoppingCart} />
          <Route exact path='/signup-signin' component={SignUpSignIn} />
          <Route exact path="/order-confirmation" component={OrderConfirmation} />
          <PrivateRoute path='/account' component={Account} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
