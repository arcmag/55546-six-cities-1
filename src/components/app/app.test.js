import renderer from 'react-test-renderer';

import {App} from './app';

const mock = {
  cities: [],
  city: ``,
  offers: [],
  hotels: [],
};

describe(`Test App`, () => {
  it(`Test App renderer`, () => {
    const tree = renderer.create(<App
      setActiveCity={jest.fn()}
      city={mock.city}
      selectCity={mock.city}
      cities={mock.cities}
      offers={mock.offers}
      hotels={mock.hotels}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
