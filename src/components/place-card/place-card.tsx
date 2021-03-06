import * as React from 'react';

import {Link} from "react-router-dom";

import {FavoriteStatus} from '../../types';

const FIVE_STARS_RATE = 5 / 100;

const PlaceCard = (props) => {
  const {
    id,
    title,
    previewImage,
    price,
    rating,
    type,
    isFavorite,
    isPremium,
  } = props.data;

  const {onSetActionCard, onAddHotelInFavorite} = props;

  return <article
    className="cities__place-card place-card">
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : ``}

    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={onSetActionCard}>
        <img className="place-card__image" src={previewImage} width="260" height="200" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        {onAddHotelInFavorite ? <button
          className={`place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`}
          type="button"
          onClick={() => {
            onAddHotelInFavorite(id, FavoriteStatus[isFavorite ? `REMOVE` : `ADD`]);
          }}
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button> : ``
        }
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: rating / FIVE_STARS_RATE + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${id}`} className="header__logo-link">{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

export default PlaceCard;
