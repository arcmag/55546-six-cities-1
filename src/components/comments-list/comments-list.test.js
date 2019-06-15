import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CommentsList from './comments-list';

const mock = [{
  user: {
    avatarUrl: ``,
    id: -1,
    isPro: true,
    name: ``,
  },
  rating: 0,
  comment: ``,
  date: 0
}, {
  user: {
    avatarUrl: ``,
    id: -1,
    isPro: true,
    name: ``,
  },
  rating: 0,
  comment: ``,
  date: 0
}];

describe(`Test CommentsList`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<CommentsList
      comments={mock}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
