import React from 'react';
import ReactDOM from 'react-dom';
import {reducer} from './reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app';

import offers from './mocks/offers';

const mainContainer = document.querySelector(`#root`);

const init = () => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  ReactDOM.render(
      <Provider store={store}>
        <App offers={offers} />
      </Provider>,
      mainContainer
  );
};

init();
