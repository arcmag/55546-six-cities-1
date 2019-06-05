import React from 'react';
import PlaceCard from '../place-card/place-card';
import MainMap from '../main-map/main-map';

import propTypesData from '../../prop-types';

import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import moment from 'moment';
import {Operation} from "../../reducer/data/data";
import {getComments} from "../../reducer/data/selectors";

const COUNT_RATE_STARS = 5;
const FIVE_STARS_RATE = COUNT_RATE_STARS / 100;
const MIN_COMMENT_LEN = 50;
const MAX_COMMENT_LEN = 300;

const MAX_COUNT_OTHER_PLACES = 3;
const MAX_COUNT_OFFER_IMAGES = 6;
const MAX_COUNT_OFFER_COMMENTS = 10;

const FavoriteStatus = {
  ADD: 1,
  REMOVE: 0,
};

let statusRedirect = false;

class Offer extends React.Component {
  constructor(props) {
    super(props);

    this._init();
  }

  render() {
    const {
      offers,
      isAuthorizationRequired,
      onAddHotelInFavorite,
      onSetActionCard,
      actionCard,
    } = this.props;
    let {comments} = this.props;
    let offer = null;
    let otherPlaces = [];

    if (statusRedirect) {
      return <Redirect to="/login" />;
    }

    if (offers.length === 0) {
      return null;
    }

    if (!comments) {
      comments = [];
    }

    offer = offers.find((it) => it.id === +this.id);

    if (!offer) {
      offer = {
        host: {},
        city: {},
        images: [],
        goods: [],
      };
    }

    otherPlaces = offers.filter(
        (it) => it !== offer && it.city.name === offer.city.name
    ).slice(0, MAX_COUNT_OTHER_PLACES);

    return <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.slice(0, MAX_COUNT_OFFER_IMAGES).map((it, idx) => {
              return <div key={idx} className="property__image-wrapper">
                <img className="property__image" src={it} alt="Photo studio" />
              </div>;
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {!offer.isPremium ? `` :
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{offer.title}</h1>
              <button
                className={`property__bookmark-button button ${offer.isFavorite ? `property__bookmark-button--active` : ``}`}
                type="button"
                onClick={() => {
                  if (isAuthorizationRequired) {
                    onAddHotelInFavorite(
                        offer.id,
                        FavoriteStatus[offer.isFavorite ? `REMOVE` : `ADD`]
                    );
                  } else {
                    statusRedirect = true;
                    this.forceUpdate();
                  }
                }}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: offer.rating / FIVE_STARS_RATE + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((it, idx) => {
                  return <li key={idx} className="property__inside-item">{it}</li>;
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`/${offer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {!offer.host.isPro ? `` : <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">{offer.host.description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
              <ul className="reviews__list">
                {comments
                  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
                  .slice(0, MAX_COUNT_OFFER_COMMENTS)
                  .map((it, idx) => {
                    return <li key={idx} className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src="/img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">{it.user.name}</span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{width: it.rating / FIVE_STARS_RATE + `%`}}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">{it.comment}</p>
                        <time className="reviews__time" dateTime={it.date}>{moment(it.date).format(`MMMM YYYY`)}</time>
                      </div>
                    </li>;
                  })}
              </ul>
              {!isAuthorizationRequired ? `` :
                <form
                  ref={this._commentForm}
                  onSubmit={this._handleFormSubmit}
                  className="reviews__form form"
                  action="#"
                  method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div
                    ref={this._ratingList}
                    className="reviews__rating-form form__rating"
                    onChange={this._handleFormChange}>
                    {Array(COUNT_RATE_STARS).fill(null).map((it, idx, arr) => {
                      const rate = arr.length - idx;
                      return <React.Fragment key={idx}>
                        <input className="form__rating-input visually-hidden" name="rating" value={rate} id={`${rate}-stars`} type="radio" />
                        <label htmlFor={`${rate}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>
                      </React.Fragment>;
                    })}
                  </div>
                  <textarea
                    ref={this._commentField}
                    onChange={this._handleFormChange}
                    className="reviews__textarea form__textarea"
                    id="review"
                    name="review"
                    placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button
                      ref={this._commentBtn}
                      className="reviews__submit form__submit button"
                      type="submit"
                      disabled="disabled">Submit</button>
                  </div>
                </form>}
            </section>
          </div>
        </div>
        <MainMap
          mapPropClass={`property__map`}
          selectedCity={offer.city.name}
          offers={otherPlaces}
          actionCard={actionCard}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {otherPlaces.map((it, idx) => {
              return <PlaceCard
                key={idx}
                data={it}
                onSetActionCard={(evt) => {
                  evt.preventDefault();
                  onSetActionCard(it);
                }}
              />;
            })}
          </div>
        </section>
      </div>
    </main>;
  }

  _init() {
    this.id = location.pathname.split(`/`)[2];

    this._commentForm = React.createRef();
    this._commentField = React.createRef();
    this._ratingList = React.createRef();
    this._commentBtn = React.createRef();

    this.text = null;
    this.rating = null;

    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._commentPostResolve = this._commentPostResolve.bind(this);
    this._commentPostReject = this._commentPostReject.bind(this);

    this.props.loadHotelComments(this.id);
  }

  _commentPostResolve() {
    this.text = null;
    this._commentField.current.value = ``;
    this._enabledFormComment();
  }

  _commentPostReject() {
    this._enabledFormComment();
    this._setErrorForm();
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.hotelCommentPost(
        this.id,
        {rating: +this.rating.value, comment: this.text},
        this._commentPostResolve,
        this._commentPostReject
    );

    this._clearErrorForm();
    this._disabledFormComment();
  }

  _handleFormChange() {
    if (!this._commentField || !this._ratingList) {
      return;
    }

    this.text = this._commentField.current.value;
    this.rating = [...this._ratingList.current.querySelectorAll(`.form__rating-input`)].find((it) => it.checked);

    if (this.text.length < MIN_COMMENT_LEN || this.text.length > MAX_COMMENT_LEN || !this.rating) {
      this._disabledButtonComment();
    } else {
      this._enabledButtonComment();
    }
  }

  _setErrorForm() {
    this._commentForm.current.style.border = `solid 1px red`;
  }

  _clearErrorForm() {
    this._commentForm.current.style.border = ``;
  }

  _disabledButtonComment() {
    this._commentBtn.current.disabled = true;
  }

  _enabledButtonComment() {
    this._commentBtn.current.disabled = false;
  }

  _disabledFormComment() {
    this._commentBtn.current.disabled = true;
    this._commentField.current.disabled = true;
  }

  _enabledFormComment() {
    this._commentBtn.current.disabled = false;
    this._commentField.current.disabled = false;
  }
}

Offer.propTypes = {
  loadHotelComments: propTypes.func.isRequired,
  hotelCommentPost: propTypes.func.isRequired,
  onAddHotelInFavorite: propTypes.func.isRequired,
  onSetActionCard: propTypes.func.isRequired,
  offers: propTypes.arrayOf(propTypesData.offer).isRequired,
  comments: propTypes.arrayOf(propTypes.shape({
    comment: propTypes.string,
    date: propTypes.string,
    id: propTypes.number,
    rating: propTypes.number,
    user: propTypes.shape({
      avatarUrl: propTypes.string,
      id: propTypes.number,
      isPro: propTypes.bool,
      name: propTypes.string,
    })
  })).isRequired,
  actionCard: propTypesData.offer,
  isAuthorizationRequired: propTypes.any,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadHotelComments: (hotelId) => {
    dispatch(Operation.loadHotelComments(hotelId));
  },
  hotelCommentPost: (hotelId, data, resolve, reject) => {
    dispatch(Operation.hotelCommentPost(hotelId, data, resolve, reject));
  },
  onAddHotelInFavorite: (hotelId, status) => {
    dispatch(Operation.addHotelInFavorite(hotelId, status));
  },
});

export {Offer};

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
