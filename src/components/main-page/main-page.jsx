import CitiesList from '../cities-list/cities-list';
import PlaceList from '../place-list/place-list';
import MainMap from '../main-map/main-map';

import withCityMap from '../../hocs/with-city-map/with-city-map';
import withPlaceList from '../../hocs/with-place-list/with-place-list';

const WrapperMainMap = withCityMap(MainMap);
const WrapperPlaceList = withPlaceList(PlaceList);

class MainPage extends React.Component {
  _renderInfoPlaceFound() {
    const {city, offers} = this.props;
    return `${offers.filter((it) => it.city.name === city).length} places to stay in ${city}`;
  }

  _renderCitiesList() {
    const {city, cities, setActiveCity} = this.props;

    return <CitiesList
      onLinkClick={setActiveCity}
      selectedCity={city}
      cities={cities}
    />;
  }

  _renderMainMap() {
    const {city, offers} = this.props;
    return <WrapperMainMap
      selectedCity={city}
      offers={offers}
    />;
  }

  _renderPlaceList() {
    const {city, offers} = this.props;

    return <WrapperPlaceList
      selectedCity={city}
      offers={offers}
    />;
  }

  render() {
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
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>

                {/* <select class="places__sorting-type" id="places-sorting">
                <option class="places__option" value="popular" selected="">Popular</option>
                <option class="places__option" value="to-high">Price: low to high</option>
                <option class="places__option" value="to-low">Price: high to low</option>
                <option class="places__option" value="top-rated">Top rated first</option>
              </select> */}

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
}

MainPage.propTypes = {
  offers: propTypes.array.isRequired,
  cities: propTypes.array.isRequired,
  setActiveCity: propTypes.func.isRequired,
  city: propTypes.any
};

export default MainPage;
