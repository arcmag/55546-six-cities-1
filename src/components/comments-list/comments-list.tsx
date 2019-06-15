import * as React from 'react';

import Comment from '../comment/comment';

import {CommentType} from '../../types';

interface Props {
  comments: CommentType[]
}

const CommentsList: React.FunctionComponent<Props> = (props: Props) => {
  return <ul className="reviews__list">
    {props.comments.map((it: CommentType, idx: number) => <Comment key={idx} data={it} />)}
  </ul>;
}

export default CommentsList;
