import CitiesList from '../cities-list/cities-list';
import PlaceList from '../place-list/place-list';
import MainMap from '../main-map/main-map';

import {connect} from 'react-redux';
import {ActionCreator, Operation} from "../../reducer/data/data";
import {getHotels} from "../../reducer/data/selectors";

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this._buttonSort = React.createRef();
    this._listSort = React.createRef();

    this._handleSortButtonClick = this._handleSortButtonClick.bind(this);
    this._handleSortListClick = this._handleSortListClick.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  render() {
    const {
      _buttonSort,
      _handleSortButtonClick,
      _listSort,
      _handleSortListClick,
    } = this;

    return <>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {this._renderCitiesList()}
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{this._renderInfoPlaceFound()}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span
                  ref={_buttonSort}
                  className="places__sorting-type"
                  tabIndex="0"
                  onClick={_handleSortButtonClick}
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul
                  ref={_listSort}
                  className="places__options places__options--custom"
                  onClick={_handleSortListClick}
                >
                  <li data-sort-offers="default" className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li data-sort-offers="max-price" className="places__option" tabIndex="0">Price: low to high</li>
                  <li data-sort-offers="min-price" className="places__option" tabIndex="0">Price: high to low</li>
                  <li data-sort-offers="max-rate" className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              {this._renderPlaceList()}
            </section>
            <div className="cities__right-section">
              {this._renderMainMap()}
            </div>
          </div>
        </div>
      </main>
    </>;
  }

  _renderInfoPlaceFound() {
    const {city, offers} = this.props;
    return `${offers.filter((it) => it.city.name === city).length} places to stay in ${city}`;
  }

  _renderCitiesList() {
    const {city, cities, onSetActiveCity} = this.props;

    return <CitiesList
      onSetActiveCity={onSetActiveCity}
      selectedCity={city}
      cities={cities}
    />;
  }

  _renderMainMap() {
    const {city, offers, actionCard} = this.props;
    return <MainMap
      actionCard={actionCard}
      selectedCity={city}
      offers={offers}
    />;
  }

  _renderPlaceList() {
    const {city, offers, onAddHotelInFavorite, onSetActionCard} = this.props;
    return <PlaceList
      onSetActionCard={onSetActionCard}

      selectedCity={city}
      offers={offers}
      onAddHotelInFavorite={onAddHotelInFavorite}
    />;
  }

  _handleSortButtonClick() {
    this._openSortList();
    document.addEventListener(`click`, this._handleDocumentClick);
  }

  _handleSortListClick(evt) {
    evt.preventDefault();
    const currentItem = evt.target;
    const type = currentItem.dataset.sortOffers;
    const selectedItem = document.querySelector(`.places__option--active`);

    this._buttonSort.current.replaceChild(
        document.createTextNode(currentItem.textContent),
        this._buttonSort.current.childNodes[0]
    );

    if (selectedItem) {
      selectedItem.classList.remove(`places__option--active`);
    }

    currentItem.classList.add(`places__option--active`);

    this.props.sortHotels(type);
  }

  _handleDocumentClick() {
    this._closeSortList();
    document.removeEventListener(`click`, this._handleDocumentClick);
  }

  _openSortList() {
    this._listSort.current.style.display = `block`;
  }

  _closeSortList() {
    this._listSort.current.style.display = `none`;
  }
}

const propTypeOffer = propTypes.shape({
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
});

MainPage.propTypes = {
  onSetActiveCity: propTypes.func.isRequired,
  sortHotels: propTypes.func.isRequired,
  onAddHotelInFavorite: propTypes.func.isRequired,
  onSetActionCard: propTypes.func.isRequired,
  offers: propTypes.arrayOf(propTypeOffer),
  actionCard: propTypeOffer,
  cities: propTypes.array.isRequired,
  city: propTypes.any,
  isAuthorizationRequired: propTypes.any,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getHotels(state),
});

const mapDispatchToProps = (dispatch) => ({
  sortHotels: (type, hotels) => {
    dispatch(ActionCreator.sortHotels(type, hotels));
  },
  onAddHotelInFavorite: (hotelId, status) => {
    dispatch(Operation.addHotelInFavorite(hotelId, status));
  },
});

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
