import * as React from 'react';

import PlaceCard from '../place-card/place-card';

import {OfferType} from '../../types';

interface Props {
  onSetActionCard: () => void,
  offers: OfferType[]
}

const FavoritesList = (props: Props) => {
  const {offers, onSetActionCard} = props;

  return offers.map((it, idx) => {
    return <PlaceCard
      key={idx}
      data={it}
      onSetActionCard={onSetActionCard}
    />;
  });
};

export default FavoritesList;
