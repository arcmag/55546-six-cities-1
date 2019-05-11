import PlaceCard from '../place-card/place-card';

class PlaceList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      actionCard: null
    };
  }

  _setActionCard(evt) {
    this.setState({
      actionCard: evt.currentTarget
    });
  }

  render() {
    const {offers} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((it, idx) => <PlaceCard
        key={idx}
        data={it}
        onImgClick={this._setActionCard.bind(this)}
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
  })).isRequired
};

export default PlaceList;
