import {Fragment} from 'react';

import MainPage from '../main-page/main-page';

const App = (props) => {
  const {offers} = props;

  return <Fragment>
    <MainPage offers={offers} />
  </Fragment>;
};

App.propTypes = {
  offers: propTypes.array.isRequired
};

export default App;
