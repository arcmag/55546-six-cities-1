import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Comment from './comment';

const mock = {
  user: {
    avatarUrl: ``,
    id: -1,
    isPro: true,
    name: ``,
  },
  rating: 0,
  comment: ``,
  date: 0
};

describe(`Test Comment`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<Comment
      data={mock}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
