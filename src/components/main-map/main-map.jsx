import leaflet from 'leaflet';

const zoom = 12;

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

let city = [52.38333, 4.9];

let map = null;

class MainMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null
    };
  }

  _init(props) {
    const {selectedCity} = props || this.props;
    const offers = selectedCity === `` ? this.props.offers : this.props.offers
      .filter((it) => it.city.name === selectedCity);

    if (offers[0]) {
      city = offers[0].city.coordinate;
    }

    map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.forEach((it) => leaflet.marker(it.coordinate, {icon}).addTo(map));
    map.setView(city, zoom);
  }

  componentDidMount() {
    try {
      this._init();
    } catch (err) {
      // err
    }
  }

  shouldComponentUpdate(props) {
    map.remove();
    this._init(props);
    return true;
  }

  render() {
    return <section className="cities__map map" id="map"></section>;
  }
}

MainMap.propTypes = {
  offers: propTypes.array.isRequired,
  selectedCity: propTypes.string.isRequired,
};

export default MainMap;
