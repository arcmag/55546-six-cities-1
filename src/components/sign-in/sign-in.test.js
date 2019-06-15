import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {SignIn} from './sign-in';

describe(`Test SignIn`, () => {
  it(`renderer`, () => {
    const tree = renderer.create(<SignIn signIn={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
