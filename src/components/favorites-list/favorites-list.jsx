import PlaceCard from '../place-card/place-card';

import propTypesData from '../../prop-types';

const FavoritesList = (props) => {
  const {offers, onSetActionCard} = props;

  return offers.map((it, idx) => {
    return <PlaceCard
      key={idx}
      data={it}
      onSetActionCard={onSetActionCard}
    />;
  });
};

FavoritesList.propTypes = {
  onSetActionCard: propTypes.func.isRequired,
  offers: propTypes.arrayOf(propTypesData.offer).isRequired
};

export default FavoritesList;
