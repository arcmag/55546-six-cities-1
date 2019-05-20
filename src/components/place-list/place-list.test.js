import renderer from 'react-test-renderer';

import PlaceList from './place-list';

const mock = {
  selectedCity: `Paris`,
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

describe(`Test PlaceList`, () => {
  it(`Test PlaceList renderer`, () => {
    const tree = renderer.create(<PlaceList
      offers={mock.offers}
      selectedCity={mock.selectedCity}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
