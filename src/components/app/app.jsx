import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer/user/user";
import {getHotels, getCities} from "../../reducer/data/selectors";
import {getSelectCity, getAuthorizationStatus, getUser} from "../../reducer/user/selectors";

import Header from '../header/header';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';

const App = (props) => {
  const {
    setActiveCity,
    hotels,
    cities,
    selectCity,
    isAuthorizationRequired,
    user,
  } = props;

  return <>
    <Header isAuthorizationRequired={isAuthorizationRequired} user={user} />
  {
    isAuthorizationRequired ?
      <SignIn /> :
      <MainPage
        setActiveCity={setActiveCity}
        city={selectCity || cities[0]}
        cities={cities}
        offers={hotels}
      />
  }
  </>;
};

App.propTypes = {
  setActiveCity: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  hotels: propTypes.array.isRequired,
  cities: propTypes.array.isRequired,
  selectCity: propTypes.string.isRequired,
  isAuthorizationRequired: propTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: getUser(state),
  hotels: getHotels(state),
  cities: getCities(state),
  selectCity: getSelectCity(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveCity: (cityName) => {
    dispatch(ActionCreator.setSelectCity(cityName));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
