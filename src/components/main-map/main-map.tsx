import * as React from 'react';
import * as leaflet from 'leaflet';

import {OfferType} from '../../types';

const FIXED_MAP_HEIGHT = 500;

let center = [52.38333, 4.9];
let zoom = 12;

let map = null;

interface Props {
  selectedCity: string,
  mapPropClass?: string,
  offers: OfferType[],
  actionCard: OfferType,
}

class MainMap extends React.Component<Props, null> {
  componentDidMount() {
    try {
      if (map) {
        map.remove();
      }

      this._init();
    } catch (err) {
      return true;
    }

    return true;
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
    const actionCard = props.actionCard || {id: -1};

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
          {
            icon: leaflet.icon({
              iconUrl: `/img/${it.id === actionCard.id ? `active-` : ``}pin.svg`,
              iconSize: [30, 30]
            })
          }
        )
        .addTo(map);
    });
    map.setView(center, zoom);
  }
}

export default MainMap;
