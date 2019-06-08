import CitiesList from '../cities-list/cities-list';
import PlaceList from '../place-list/place-list';
import MainMap from '../main-map/main-map';

import propTypesData from '../../prop-types';

import {connect} from 'react-redux';
import {ActionCreator, Operation} from "../../reducer/data/data";
import {getHotels} from "../../reducer/data/selectors";

const itemsSortList = [
  {
    title: `Popular`,
    isActive: true,
    data: `default`,
  },
  {
    title: `Price: low to high`,
    data: `min-price`,
  },
  {
    title: `Price: high to low`,
    data: `max-price`,
  },
  {
    title: `Top rated first`,
    data: `max-rate`,
  },
];

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this._buttonSort = React.createRef();
    this._listSort = React.createRef();

    this._handleSortButtonClick = this._handleSortButtonClick.bind(this);
  }

  render() {
    const {
      _buttonSort,
      _handleSortButtonClick,
      _listSort,
    } = this;

    const {sortHotels} = this.props;

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
                  onClick={_handleSortButtonClick}>
                  {itemsSortList.find((it) => it.isActive).title}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul
                  ref={_listSort}
                  className="places__options places__options--custom"
                  style={{display: `none`}}>
                  {itemsSortList.map((it, idx) => {
                    return <li
                      key={idx}
                      onClick={() => {
                        itemsSortList.forEach((item) => {
                          item.isActive = false;
                        });
                        itemsSortList[idx].isActive = true;
                        sortHotels(it.data);
                        this._toggleSortList();
                      }}
                      data-sort-offers={it.data}
                      className={`places__option ${it.isActive ? `places__option--active` : ``}`}
                      tabIndex="0">{it.title}</li>;
                  })}
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
    this._toggleSortList();
  }

  _toggleSortList() {
    this._listSort.current.style.display = this._listSort.current.style.display === `block` ? `none` : `block`;
  }
}

MainPage.propTypes = {
  onSetActiveCity: propTypes.func.isRequired,
  sortHotels: propTypes.func.isRequired,
  onAddHotelInFavorite: propTypes.func.isRequired,
  onSetActionCard: propTypes.func.isRequired,
  offers: propTypes.arrayOf(propTypesData.offer).isRequired,
  cities: propTypes.arrayOf(propTypes.string).isRequired,
  actionCard: propTypesData.offer,
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
