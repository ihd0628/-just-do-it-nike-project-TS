import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './Router';

import './styles/reset.scss';
import './styles/common.scss';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
