import renderer from 'react-test-renderer';

import Header from './header';

const mock = {
  isAuthorizationRequired: false,
  user: {},
};

describe(`Test Header`, () => {
  it(`renderer`, () => {
    const tree = renderer.create(<Header
      isAuthorizationRequired={mock.isAuthorizationRequired}
      user={mock.user}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
