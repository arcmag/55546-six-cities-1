import leaflet from 'leaflet';

const city = [52.38333, 4.9];
const zoom = 12;

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

class MainMap extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _init() {
    const {offers} = this.props;

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.forEach((it) => leaflet.marker(it.coordinate, {icon}).addTo(map));
  }

  componentDidMount() {
    try {
      this._init();
    } catch (err) {
      // err
    }
  }

  render() {
    return <section className="cities__map map" id="map"></section>;
  }
}

MainMap.propTypes = {
  offers: propTypes.array.isRequired
};

export default MainMap;
