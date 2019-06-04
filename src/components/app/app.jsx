import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer/user/user";
import {getCities, getHotels} from "../../reducer/data/selectors";
import {getSelectCity, getAuthorizationStatus, getUser} from "../../reducer/user/selectors";
import {Redirect, Switch, Route} from "react-router-dom";

import Header from '../header/header';
import Offer from '../offer/offer';
import MainPage from '../main-page/main-page';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';

import withActiveCard from '../../hocs/with-active-card/with-active-card';

const WrapperMainPage = withActiveCard(MainPage);
const WrapperOffer = withActiveCard(Offer);

const App = (props) => {
  const {
    onSetActiveCity,
    cities,
    selectCity,
    isAuthorizationRequired,
    user,
    hotels,
  } = props;

  return <>
    <Header isAuthorizationRequired={isAuthorizationRequired} user={user} />
    <Switch>
      <Route exact path="/" render={() => {
        return <WrapperMainPage
          isAuthorizationRequired={isAuthorizationRequired}
          onSetActiveCity={onSetActiveCity}
          city={selectCity || cities[0]}
          cities={cities}
        />;
      }} />

      <Route path="/offer/:id" render={() => {
        return <WrapperOffer isAuthorizationRequired={isAuthorizationRequired} offers={hotels} />;
      }} />

      <Route path="/favorites" render={() => {
        if (isAuthorizationRequired !== null && !isAuthorizationRequired) {
          return <Redirect to="/login" />;
        }

        return <Favorites />;
      }} />

      <Route exact path="/login" render={() => {
        if (isAuthorizationRequired === null) {
          return null;
        }

        if (isAuthorizationRequired) {
          return <Redirect to="/" />;
        }

        return <SignIn isAuthorizationRequired={isAuthorizationRequired} />;
      }} />
    </Switch>
  </>;
};

App.propTypes = {
  onSetActiveCity: propTypes.func.isRequired,
  user: propTypes.shape({
    avatarUrl: propTypes.string,
    email: propTypes.string,
    id: propTypes.number,
    isPro: propTypes.bool,
    name: propTypes.string,
  }),
  hotels: propTypes.arrayOf(propTypes.shape({
    bedrooms: propTypes.number,
    city: propTypes.shape({
      name: propTypes.string,
      location: propTypes.shape({
        latitude: propTypes.number,
        longitude: propTypes.number,
        zoom: propTypes.number,
      }),
    }),
    description: propTypes.string,
    goods: propTypes.array,
    host: propTypes.shape({
      avatarUrl: propTypes.string,
      id: propTypes.number,
      isPro: propTypes.bool,
      name: propTypes.string,
    }),
    id: propTypes.number,
    images: propTypes.array,
    isFavorite: propTypes.bool,
    isPremium: propTypes.bool,
    location: propTypes.shape({
      latitude: propTypes.number,
      longitude: propTypes.number,
      zoom: propTypes.number,
    }),
    maxAdults: propTypes.number,
    previewImage: propTypes.string,
    price: propTypes.number,
    rating: propTypes.number,
    title: propTypes.string,
    type: propTypes.string,
  })),
  cities: propTypes.array.isRequired,
  selectCity: propTypes.string.isRequired,
  isAuthorizationRequired: propTypes.any,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  hotels: getHotels(state),
  user: getUser(state),
  cities: getCities(state),
  selectCity: getSelectCity(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSetActiveCity: (cityName) => {
    dispatch(ActionCreator.setSelectCity(cityName));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
