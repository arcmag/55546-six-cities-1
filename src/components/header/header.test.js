import {BrowserRouter} from "react-router-dom";
import renderer from 'react-test-renderer';

import Header from './header';

const mock = {
  isAuthorizationRequired: false,
  user: {},
};

describe(`Test Header`, () => {
  it(`renderer`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Header
            isAuthorizationRequired={mock.isAuthorizationRequired}
            user={mock.user}
          />
        </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
