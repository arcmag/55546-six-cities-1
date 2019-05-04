import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const mainContainer = document.querySelector(`#root`);

const init = () => {
  ReactDOM.render(
      <App
        rentList={
          [
            `Beautiful & luxurious apartment at great location`,
            `Wood and stone place`,
            `White castle`,
            `Nice, cozy, warm big bed apartment`
          ]
        }
      />,
      mainContainer
  );
};

init();
