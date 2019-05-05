import React from 'react';
import propTypes from 'prop-types';

const Favorites = (props) => {
  const name = props.name;
  const onTitleClick = props.onTitleClick;

  Favorites.propTypes = {
    name: propTypes.string.isRequired,
    onTitleClick: propTypes.func
  };

  return <article className="favorites__card">
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place image"></img>
      </a>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;180</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            {/* <use xlink:href="#icon-bookmark"></use> */}
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          {/* <span style="width: 100%"></span> */}
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a onClick={onTitleClick} href="#">{name}</a>
      </h2>
      <p className="place-card__type">Apartment</p>
    </div>
  </article>;
};

export default Favorites;
