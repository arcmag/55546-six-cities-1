import leaflet from 'leaflet';

const FIXED_MAP_HEIGHT = 500;

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const activeIcon = leaflet.icon({
  iconUrl: `img/active-pin.svg`,
  iconSize: [30, 30]
});

let center = [52.38333, 4.9];
let zoom = 12;

let map = null;

class MainMap extends React.Component {
  componentDidMount() {
    try {
      if (map) {
        map.remove();
      }

      this._init();
    } catch (err) {
      // err
    }
  }

  shouldComponentUpdate(props) {
    if (map) {
      map.remove();
    }

    this._init(props);

    return true;
  }

  render() {
    let mapClass = `cities__map`;
    const {mapPropClass} = this.props;

    if (mapPropClass) {
      mapClass = mapPropClass;
    }

    return <section style={{height: `${FIXED_MAP_HEIGHT}px`}} className={`${mapClass} map`} id="map"></section>;
  }

  _init(props = this.props) {
    const {selectedCity} = props;
    const actionCard = props.actionCard || {};

    const offers = selectedCity === `` ? props.offers : props.offers
      .filter((it) => it.city.name === selectedCity);

    const firstOffer = offers[0];

    if (!firstOffer) {
      return;
    }

    const location = firstOffer.city.location;
    center = [location.latitude, location.longitude];
    zoom = location.zoom;

    map = leaflet.map(`map`, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.forEach((it) => {
      if (it.id === actionCard.id) {
        center = [it.location.latitude, it.location.longitude];
      }

      leaflet
        .marker(
            [it.location.latitude, it.location.longitude],
            {icon: it.id === actionCard.id ? activeIcon : icon}
        )
        .addTo(map);
    });
    map.setView(center, zoom);
  }
}

MainMap.propTypes = {
  selectedCity: propTypes.any,
  mapPropClass: propTypes.string,
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

export default MainMap;
