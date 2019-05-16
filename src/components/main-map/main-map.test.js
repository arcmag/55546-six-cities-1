import renderer from 'react-test-renderer';

import MainMap from './main-map';

const mockOffers = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    price: 120,
    rating: 4.7,
    type: `Apartment`,
    coordinate: [52.3909553943508, 4.85309666406198],
    isChecked: false,
    isPremium: true
  },
  {
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    price: 120,
    rating: 4.7,
    type: `Apartment`,
    coordinate: [52.3909553943508, 4.85309666406198],
    isChecked: false,
    isPremium: true
  }
];

describe(`Test MainMap`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<MainMap offers={mockOffers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
