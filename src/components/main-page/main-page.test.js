import renderer from 'react-test-renderer';

import MainPage from './main-page';

const mock = {
  offers: [],
  cities: [],
  city: ``,
};

describe(`Test MainPage`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<MainPage
      setActiveCity={jest.fn()}
      offers={mock.offers}
      cities={mock.cities}
      city={mock.city}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
