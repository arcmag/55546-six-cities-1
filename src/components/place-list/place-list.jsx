import PlaceCard from '../../components/place-card/place-card';

class PlaceList extends React.Component {
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

PlaceList.propTypes = {
  onAddHotelInFavorite: propTypes.func.isRequired,
  onSetActionCard: propTypes.func.isRequired,
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
  selectedCity: propTypes.any,
};


export default PlaceList;
