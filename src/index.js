import React from 'react';
import ReactDOM from 'react-dom';
import {reducer} from './reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app';

import offers from './mocks/offers';

const mainContainer = document.querySelector(`#root`);
const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App offers={offers} />
      </Provider>,
      mainContainer
  );
};

init();
