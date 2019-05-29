import leaflet from 'leaflet';

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

let center = [52.38333, 4.9];
let zoom = 12;

let map = null;

const withCityMap = (Component) => {
  class WithCityMap extends React.Component {
    _init(props = this.props) {
      const {selectedCity} = props;

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

      offers.forEach((it) => leaflet.marker([it.location.latitude, it.location.longitude], {icon}).addTo(map));
      map.setView(center, zoom);
    }

    componentDidMount() {
      try {
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
      return (
        <Component {...this.props} />
      );
    }
  }

  WithCityMap.propTypes = {
    offers: propTypes.array.isRequired,
    selectedCity: propTypes.any,
  };

  return WithCityMap;
};

export default withCityMap;
