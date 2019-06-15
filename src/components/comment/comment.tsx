import * as React from 'react';
import * as moment from 'moment';

import {CommentType} from '../../types';

const FIVE_STARS_RATE = 5 / 100;

interface Props {
  data: CommentType
}

const Comment: React.FunctionComponent<Props> = (props) => {
  const {user, rating, comment, date} = props.data;

  console.log(props.data);

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src="/img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">{user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: rating / FIVE_STARS_RATE + `%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{comment}</p>
      <time className="reviews__time" dateTime={date}>{moment(date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;
}

export default Comment;

