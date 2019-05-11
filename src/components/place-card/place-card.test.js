import renderer from 'react-test-renderer';

import PlaceCard from './place-card';

const dataMock = {
  title: `Beautiful & luxurious apartment at great location`,
  src: `img/apartment-01.jpg`,
  price: 120,
  rating: 4.7,
  type: `Apartment`,
  isChecked: false,
  isPremium: true
};

describe(`Test PlaceCard`, () => {
  it(`Test PlaceCard renderer`, () => {
    const tree = renderer.create(<PlaceCard
      data={dataMock}
      onImgClick={jest.fn()}
      onCardMouseOver={jest.fn()}
      onCardMouseOut={jest.fn()}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
