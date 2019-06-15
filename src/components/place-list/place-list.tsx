import * as React from 'react';

import PlaceCard from '../../components/place-card/place-card';

import {OfferType} from '../../types';

interface Props {
  onAddHotelInFavorite: (hotelId: number, status: number) => void,
  onSetActionCard: (card: OfferType) => void,
  offers: OfferType[],
  selectedCity: string,
}

class PlaceList extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._getActiveOffers = this._getActiveOffers.bind(this);
    this._renderOffers = this._renderOffers.bind(this);
  }

  render() {
    const selectOffers = this._renderOffers();

    return <div className="cities__places-list places__list tabs__content">
      {selectOffers.length > 0 ? selectOffers :
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
          </div>
        </section>}
    </div>;
  }

  _getActiveOffers() {
    const {selectedCity, offers} = this.props;
    return selectedCity === `` ? offers : offers
      .filter((it) => it.city.name === selectedCity);
  }

  _renderOffers() {
    const {onAddHotelInFavorite, onSetActionCard} = this.props;

    return this._getActiveOffers().map((it, idx) => <PlaceCard
      key={idx}
      data={it}
      onSetActionCard={() => {
        onSetActionCard(it);
      }}
      onAddHotelInFavorite={onAddHotelInFavorite}
    />);
  }
}

export default PlaceList;
