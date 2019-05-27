import PlaceCard from '../../components/place-card/place-card';

const withPlaceList = (Component) => {
  class WithPlaceList extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        actionCard: null
      };

      this._setActionCard = this._setActionCard.bind(this);
      this._clearActionCard = this._clearActionCard.bind(this);

      this._getActiveOffers = this._getActiveOffers.bind(this);
      this._renderOffers = this._renderOffers.bind(this);
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

    _getActiveOffers() {
      const {selectedCity, offers} = this.props;
      return selectedCity === `` ? offers : offers
        .filter((it) => it.city.name === selectedCity);
    }

    _renderOffers() {
      return this._getActiveOffers().map((it, idx) => <PlaceCard
        key={idx}
        data={it}
        onImgClick={this._setActionCard}
        onImgMouseOver={() => {
          this._setActionCard(it);
        }}
        onImgMouseOut={this._clearActionCard}
      />);
    }

    render() {
      return <Component
        {...this.props}
        renderOffers={this._renderOffers}
      />;
    }
  }

  WithPlaceList.propTypes = {
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

  return WithPlaceList;
};

export default withPlaceList;
