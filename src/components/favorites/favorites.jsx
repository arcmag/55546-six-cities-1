import FavoritesList from '../favorites-list/favorites-list';

import {connect} from 'react-redux';
import {getHotels} from "../../reducer/data/selectors";

import withActiveCard from '../../hocs/with-active-card/with-active-card';
const WrapperFavoritesList = withActiveCard(FavoritesList);

class Favorites extends React.Component {
  render() {
    const offersCities = this._getCardsByCities();

    return <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {offersCities.length === 0 ?
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section> :
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <WrapperFavoritesList offersCities={offersCities} />
          </section>
        }
      </div>
    </main>;
  }

  _getCardsByCities() {
    return Object.entries(this.props.offers.filter((it) => it.isFavorite).reduce((obj, it) => {
      const cityName = it.city.name;

      if (!obj[cityName]) {
        obj[cityName] = [];
      }

      obj[cityName].push(it);

      return obj;
    }, {}));
  }
}

Favorites.propTypes = {
  offers: propTypes.arrayOf(propTypes.shape({
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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getHotels(state),
});

export {Favorites};

export default connect(mapStateToProps)(Favorites);
