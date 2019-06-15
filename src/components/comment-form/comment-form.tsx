import * as React from 'react';

import {DataCommentType} from '../../types';

const COUNT_RATE_STARS = 5;

enum CommentLen {
  MIN = 50,
  MAX = 300,
}

interface Props {
  hotelCommentPost: (hotelId: number, data: DataCommentType, resolve: any, reject: any) => void,
  id: number,
}

class CommentForm extends React.PureComponent<Props, null> {
  private _commentForm: React.RefObject<HTMLFormElement>;
  private _commentField: React.RefObject<HTMLTextAreaElement>;
  private _ratingList: React.RefObject<HTMLDivElement>;
  private _commentBtn: React.RefObject<HTMLButtonElement>;

  private selectedRateting: number;
  private text: string;

  constructor(props) {
    super(props);

    this._commentForm = React.createRef();
    this._commentField = React.createRef();
    this._ratingList = React.createRef();
    this._commentBtn = React.createRef();

    this.selectedRateting = null;
    this.text = null;

    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._commentPostResolve = this._commentPostResolve.bind(this);
    this._commentPostReject = this._commentPostReject.bind(this);
  }

  render() {
    return <form
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
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rate}
              id={`${rate}-stars`}
              type="radio"
              onClick={() => {
                this.selectedRateting = rate;
              }} />
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
          disabled={true}>Submit</button>
      </div>
    </form>;
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
    const {hotelCommentPost, id} = this.props;

    evt.preventDefault();

    hotelCommentPost(
      id,
      {rating: +this.selectedRateting, comment: this.text},
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

    if (this.text.length < CommentLen.MIN || this.text.length > CommentLen.MAX || !this.selectedRateting) {
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

export default CommentForm;
