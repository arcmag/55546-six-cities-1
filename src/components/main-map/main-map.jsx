class MainMap extends React.Component {
  render() {
    let mapClass = `cities__map`;
    const {mapPropClass} = this.props;

    if (mapPropClass) {
      mapClass = mapPropClass;
    }

    return <section style={{height: `500px`}} className={`${mapClass} map`} id="map"></section>;
  }
}

MainMap.propTypes = {
  mapPropClass: propTypes.string
};

export default MainMap;
