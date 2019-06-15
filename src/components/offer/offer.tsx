import * as React from 'react';

import PlaceCard from '../place-card/place-card';
import MainMap from '../main-map/main-map';

import CommentForm from '../comment-form/comment-form';
import CommentsList from '../comments-list/comments-list';

import {OfferType, CommentType, FavoriteStatus, DataCommentType} from '../../types';

import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {Operation} from "../../reducer/data/data";
import {getComments} from "../../reducer/data/selectors";

const COUNT_RATE_STARS = 5;
const FIVE_STARS_RATE = COUNT_RATE_STARS / 100;

enum CountOffer {
  OTHER_PLACES = 3,
  IMAGES = 6,
  COMMENTS = 10,
};

let statusRedirect = false;

interface Props {
  loadHotelComments: (hotelId: number) => void,
  hotelCommentPost: (hotelId: number, data: DataCommentType, resolve, reject) => void,
  onAddHotelInFavorite: (hotelId: number, status: number) => void,
  onSetActionCard: (card: OfferType) => void,
  offers: OfferType[],
  comments: CommentType[],
  actionCard: OfferType,
  isAuthorizationRequired: boolean,
}

class Offer extends React.PureComponent<Props, null> {
  private id: number;

  constructor(props) {
    super(props);

    this.id = +(location.pathname.split(`/`)[2] || -1);
    this.props.loadHotelComments(this.id);
  }

  render() {
    const {
      offers,
      isAuthorizationRequired,
      onAddHotelInFavorite,
      onSetActionCard,
      actionCard,
      hotelCommentPost,
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

    otherPlaces = offers.filter(
        (it) => it.id !== offer.id && it.city.name === offer.city.name
    ).slice(0, CountOffer.OTHER_PLACES);

    return <main className="page__main page__main--property" >
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.slice(0, CountOffer.IMAGES).map((it, idx) => {
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
                <svg
                  style={{fill: offer.isFavorite ? `#4481c3` : `transparent`}}
                  className="property__bookmark-icon" width="31" height="33">
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
                <CommentsList comments={comments
                  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
                  .slice(0, CountOffer.COMMENTS)} />
              </ul>
              {!isAuthorizationRequired ? `` : <CommentForm id={this.id} hotelCommentPost={hotelCommentPost} />}
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
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loadHotelComments: (hotelId: number) => {
    dispatch(Operation.loadHotelComments(hotelId));
  },
  hotelCommentPost: (hotelId: number, data: DataCommentType, resolve, reject) => {
    dispatch(Operation.hotelCommentPost(hotelId, data, resolve, reject));
  },
  onAddHotelInFavorite: (hotelId: number, status: number) => {
    dispatch(Operation.addHotelInFavorite(hotelId, status));
  },
});

export {Offer};

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
