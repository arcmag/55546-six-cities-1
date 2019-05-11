import renderer from 'react-test-renderer';

import PlaceList from './place-list';

const dataMock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    price: 120,
    rating: 4.7,
    type: `Apartment`,
    isChecked: false,
    isPremium: true
  },
  {
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    price: 120,
    rating: 4.7,
    type: `Apartment`,
    isChecked: false,
    isPremium: true
  }
];

describe(`Test PlaceList`, () => {
  it(`Test PlaceList renderer`, () => {
    const tree = renderer.create(<PlaceList offers={dataMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
