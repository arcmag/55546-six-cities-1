import PlaceCard from '../place-card/place-card';

class PlaceList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      actionCard: null
    };

    this._setActionCard = this._setActionCard.bind(this);
    this._clearActionCard = this._clearActionCard.bind(this);
  }

  _setActionCard(card) {
    this.setState({
      actionCard: card
    });
  }

  _clearActionCard() {
    this.setState({
      actionCard: null
    });
  }

  render() {
    const {selectedCity} = this.props;
    const offers = selectedCity === `` ? this.props.offers : this.props.offers
      .filter((it) => it.city.name === selectedCity);

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((it, idx) => <PlaceCard
        key={idx}
        data={it}
        onImgClick={this._setActionCard}
        onImgMouseOver={() => {
          this._setActionCard(it);
        }}
        onImgMouseOut={this._clearActionCard}
      />)}
    </div>;
  }
}

PlaceList.propTypes = {
  offers: propTypes.arrayOf(propTypes.shape({
    title: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    rating: propTypes.number.isRequired,
    type: propTypes.string.isRequired,
    isChecked: propTypes.bool,
    isPremium: propTypes.bool
  })).isRequired,
  selectedCity: propTypes.string.isRequired,
};

export default PlaceList;
