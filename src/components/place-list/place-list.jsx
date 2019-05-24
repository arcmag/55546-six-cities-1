class PlaceList extends React.PureComponent {
  render() {
    return <div className="cities__places-list places__list tabs__content">
      {this.props.renderOffers()}
    </div>;
  }
}

PlaceList.propTypes = {
  renderOffers: propTypes.func.isRequired,
};

export default PlaceList;
