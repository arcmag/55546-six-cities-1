import PlaceCard from '../place-card/place-card';

const FavoritesList = (props) => {
  const {offersCities, onSetActionCard} = props;

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
              onSetActionCard={onSetActionCard}
            />;
          })}
        </div>
      </li>;
    })}
  </ul>;
};

FavoritesList.propTypes = {
  onSetActionCard: propTypes.func.isRequired,
  offersCities: propTypes.arrayOf(
      propTypes.string,
      propTypes.arrayOf(
          propTypes.shape({
            bedrooms: propTypes.number,
            city: propTypes.shape({
              name: propTypes.string,
              location: propTypes.shape({
                latitude: propTypes.number,
                longitude: propTypes.number,
                zoom: propTypes.number
              })
            }),
            description: propTypes.string,
            goods: propTypes.arrayOf(propTypes.string),
            host: propTypes.shape({
              avatarUrl: propTypes.string,
              id: propTypes.number,
              isPro: propTypes.bool,
              name: propTypes.string
            }),
            id: propTypes.number,
            images: propTypes.arrayOf(propTypes.string),
            isFavorite: propTypes.bool,
            isPremium: propTypes.bool,
            location: propTypes.shape({
              latitude: propTypes.number,
              longitude: propTypes.number,
              zoom: propTypes.number
            }),
            maxAdults: propTypes.number,
            previewImage: propTypes.string,
            price: propTypes.number,
            rating: propTypes.number,
            title: propTypes.string,
            type: propTypes.string
          })
      )
  )
};

export default FavoritesList;
