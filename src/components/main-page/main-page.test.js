import renderer from 'react-test-renderer';

import MainPage from './main-page';

const mock = {
  cities: [`Amsterdam`, `Paris`, `Cologne`],
  city: `Amsterdam`,
  offers: [
    {
      title: `Beautiful & luxurious apartment at great location`,
      src: `img/apartment-01.jpg`,
      city: {
        name: `Paris`,
        coordinate: [48.852969, 2.351074]
      },
      price: 120,
      rating: 4.7,
      type: `Apartment`,
      coordinate: [48.852969123654, 2.351074654123],
      isChecked: false,
      isPremium: true
    },
    {
      title: `Beautiful & luxurious apartment at great location`,
      src: `img/apartment-01.jpg`,
      city: {
        name: `Paris`,
        coordinate: [48.852969, 2.351074]
      },
      price: 120,
      rating: 4.7,
      type: `Apartment`,
      coordinate: [48.852969123654, 2.351074654123],
      isChecked: false,
      isPremium: true
    }
  ]
};

describe(`Test MainPage`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<MainPage
      setActiveCity={(jest.fn())}
      city={mock.city}
      cities={mock.cities}
      offers={mock.offers}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
