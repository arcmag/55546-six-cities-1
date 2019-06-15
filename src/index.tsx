import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from './reducer/index';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createAPI} from './api';
import {Operation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator} from "./reducer/user/user";
import {BrowserRouter} from "react-router-dom";

import App from './components/app/app';

const mainContainer = document.querySelector(`#root`);

const init = () => {
  const api = createAPI((): void => {
    store.dispatch(ActionCreator.requireAuthorization(false));
  });

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(Operation.loadHotels());
  store.dispatch(UserOperation.checkAuthorization());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      mainContainer
  );
};

init();
