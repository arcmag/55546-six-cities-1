// import PlaceCard from '../../components/place-card/place-card';

// const withPlaceList = (Component) => {
//   class WithPlaceList extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//         actionCard: null
//       };

//       this._setActionCard = this._setActionCard.bind(this);
//       this._clearActionCard = this._clearActionCard.bind(this);

//       this._getActiveOffers = this._getActiveOffers.bind(this);
//       this._renderOffers = this._renderOffers.bind(this);
//     }

//     _setActionCard(card) {
//       this.setState({
//         actionCard: card
//       });
//     }

//     _clearActionCard() {
//       this.setState({
//         actionCard: null
//       });
//     }

//     _getActiveOffers() {
//       const {selectedCity, offers} = this.props;
//       return selectedCity === `` ? offers : offers
//         .filter((it) => it.city.name === selectedCity);
//     }

//     _renderOffers() {
//       return this._getActiveOffers().map((it, idx) => <PlaceCard
//         key={idx}
//         data={it}
//         onImgClick={this._setActionCard}
//         onImgMouseOver={() => {
//           this._setActionCard(it);
//         }}
//         onImgMouseOut={this._clearActionCard}
//         addHotelInFavorite={this.props.addHotelInFavorite}
//       />);
//     }

//     render() {
//       return <Component
//         {...this.props}
//         renderOffers={this._renderOffers}
//       />;
//     }
//   }

//   WithPlaceList.propTypes = {
//     addHotelInFavorite: propTypes.func.isRequired,
//     offers: propTypes.arrayOf(propTypes.shape({
//       bedrooms: propTypes.number,
//       city: propTypes.shape({
//         name: propTypes.string,
//         location: propTypes.shape({
//           latitude: propTypes.number,
//           longitude: propTypes.number,
//           zoom: propTypes.number,
//         }),
//       }),
//       description: propTypes.string,
//       goods: propTypes.array,
//       host: propTypes.shape({
//         avatarUrl: propTypes.string,
//         id: propTypes.number,
//         isPro: propTypes.bool,
//         name: propTypes.string,
//       }),
//       id: propTypes.number,
//       images: propTypes.array,
//       isFavorite: propTypes.bool,
//       isPremium: propTypes.bool,
//       location: propTypes.shape({
//         latitude: propTypes.number,
//         longitude: propTypes.number,
//         zoom: propTypes.number,
//       }),
//       maxAdults: propTypes.number,
//       previewImage: propTypes.string,
//       price: propTypes.number,
//       rating: propTypes.number,
//       title: propTypes.string,
//       type: propTypes.string,
//     })),
//     selectedCity: propTypes.any,
//   };

//   return WithPlaceList;
// };

// export default withPlaceList;
