import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import AuthCheck from './components/auth/AuthCheck';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthCheck>
        <App />
      </AuthCheck>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
