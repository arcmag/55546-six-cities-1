import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer/user/user";
import {getHotels, getCities} from "../../reducer/data/selectors";
import {getSelectCity} from "../../reducer/user/selectors";

import MainPage from '../main-page/main-page';

const App = (props) => {
  const {setActiveCity, hotels, cities, selectCity} = props;

  return <>
    <MainPage
      setActiveCity={setActiveCity}
      city={selectCity || cities[0]}
      cities={cities}
      offers={hotels}
    />
  </>;
};

App.propTypes = {
  setActiveCity: propTypes.func.isRequired,
  hotels: propTypes.array.isRequired,
  cities: propTypes.array.isRequired,
  selectCity: propTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  hotels: getHotels(state),
  cities: getCities(state),
  selectCity: getSelectCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveCity: (cityName) => {
    dispatch(ActionCreator.setSelectCity(cityName));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
