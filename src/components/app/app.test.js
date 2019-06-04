/* eslint-disable */

import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from 'react-test-renderer';

import {App} from './app';

const mock = {
  user: {},
  isAuthorizationRequired: false,
  cities: [],
  city: ``,
  hotels: [],
};
/* eslint-disable */
describe(`Test App`, () => {
  it(`Test App renderer`, () => {
    const tree = renderer.create(
        // <Provider>
          <BrowserRouter>
            <App
              user={mock.user}
              isAuthorizationRequired={mock.isAuthorizationRequired}
              onSetActiveCity={jest.fn()}
              city={mock.city}
              selectCity={mock.city}
              cities={mock.cities}
              hotels={mock.hotels}
            />
          </BrowserRouter>
        // {/* </Provider> */}
        ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
