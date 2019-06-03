import PlaceCard from '../place-card/place-card';

const FavoritesList = (props) => {
  const {offersCities, setActionCard, clearActionCard} = props;

  return <ul className="favorites__list">
    {offersCities.map((it, idx) => {
      const [city, cards] = it;

      return <li key={idx} className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{city}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {cards.map((card, idxCard) => {
            return <PlaceCard
              key={idxCard}
              data={card}
              onImgClick={setActionCard}
              onImgMouseOver={() => {
                setActionCard(it);
              }}
              onImgMouseOut={clearActionCard}
            />;
          })}
        </div>
      </li>;
    })}
  </ul>;
};

FavoritesList.propTypes = {
  setActionCard: propTypes.func.isRequired,
  clearActionCard: propTypes.func.isRequired,
  offersCities: propTypes.array.isRequired,
};

export default FavoritesList;
