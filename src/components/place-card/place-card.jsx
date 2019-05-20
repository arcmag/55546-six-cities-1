const PlaceCard = (props) => {
  const {title, src, price, rating, type, isChecked, isPremium} = props.data;
  const {onImgMouseOver, onImgMouseOut, onImgClick} = props;

  return <article
    className="cities__place-card place-card">
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : ``}

    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#"
        onMouseOver={onImgMouseOver}
        onMouseOut={onImgMouseOut}
        onClick={onImgClick}
      >
        <img className="place-card__image" src={src} width="260" height="200" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${isChecked ? `place-card__bookmark-button--active` : ``}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: rating / (5 / 100) + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

PlaceCard.propTypes = {
  data: propTypes.shape({
    title: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    rating: propTypes.number.isRequired,
    type: propTypes.string.isRequired,
    isChecked: propTypes.bool,
    isPremium: propTypes.bool
  }).isRequired,
  onImgClick: propTypes.func.isRequired,
  onImgMouseOver: propTypes.func.isRequired,
  onImgMouseOut: propTypes.func.isRequired
};

export default PlaceCard;
