import React from 'react';
import propTypes from 'prop-types';

import Favorites from '../favorites/favorites.jsx';

const App = (props) => {
  const rentList = props.rentList;

  App.propTypes = {
    rentList: propTypes.array
  };

  return <div>
    <h1>React application</h1>
    {rentList.map((it, idx) => <Favorites key={idx} name={it} />)}
  </div>;
};

export default App;
