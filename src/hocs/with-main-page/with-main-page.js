import CitiesList from '../../components/cities-list/cities-list';
import PlaceList from '../../components/place-list/place-list';
import MainMap from '../../components/main-map/main-map';

import withCityMap from '../../hocs/with-city-map/with-city-map';
import withPlaceList from '../../hocs/with-place-list/with-place-list';

const WrapperMainMap = withCityMap(MainMap);
const WrapperPlaceList = withPlaceList(PlaceList);

const withMainPage = (Component) => {
  class WithMainPage extends React.PureComponent {
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
      return <Component
        {...this.props}
        renderMainMap={this._renderMainMap.bind(this)}
        renderPlaceList={this._renderPlaceList.bind(this)}
        renderCitiesList={this._renderCitiesList.bind(this)}
        renderInfoPlaceFound={this._renderInfoPlaceFound.bind(this)}
      />;
    }
  }

  WithMainPage.propTypes = {
    offers: propTypes.array.isRequired,
    cities: propTypes.array.isRequired,
    setActiveCity: propTypes.func.isRequired,
    city: propTypes.string.isRequired,
  };

  return WithMainPage;
};

export default withMainPage;
