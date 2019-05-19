import {Fragment} from 'react';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page';

const App = (props) => {
  const {city, offers, setActiveCity} = props;
  const cities = [...new Set(offers.map((it) => it.city.name))].slice(0, 6);

  return <Fragment>
    <MainPage
      setActiveCity={setActiveCity}
      city={city ? city : cities[0]}
      cities={cities}
      offers={offers}
    />
  </Fragment>;
};

App.propTypes = {
  setActiveCity: propTypes.func.isRequired,
  city: propTypes.string.isRequired,
  offers: propTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offers: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  setActiveCity: (cityName) => {
    dispatch({type: `SET_CITY`, payload: cityName});
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
