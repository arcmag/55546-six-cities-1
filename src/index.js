import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer/index';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {createAPI} from './api';
import {Operation} from "./reducer/data/data";

import App from './components/app/app';

const mainContainer = document.querySelector(`#root`);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */

  store.dispatch(Operation.loadHotels());

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      mainContainer
  );
};

init();
