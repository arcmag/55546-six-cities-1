import FavoritesList from '../favorites-list/favorites-list';

import propTypesData from '../../prop-types';

import {connect} from 'react-redux';
import {getHotels} from "../../reducer/data/selectors";

import withActiveCard from '../../hocs/with-active-card/with-active-card';
const WrapperFavoritesList = withActiveCard(FavoritesList);

class Favorites extends React.PureComponent {
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
            {offersCities.map((data, idx) => {
              const [city, offers] = data;

              return <ul className="favorites__list" key={idx}>
                <li key={idx} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <WrapperFavoritesList offers={offers} />
                  </div>
                </li>
              </ul>;
            })}
          </section>}
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
  offers: propTypes.arrayOf(propTypesData.offer).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getHotels(state),
});

export {Favorites};

export default connect(mapStateToProps)(Favorites);
