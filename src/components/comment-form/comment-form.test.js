import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CommentForm from './comment-form';

describe(`Test CommentForm`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<CommentForm
      hotelCommentPost={jest.fn()}
      id={-1}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
