import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';

configure({adapter: new Adapter()});

const dataMock = {
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
};

describe(`e2e test PlaceCard`, () => {
  it(`test image click`, () => {
    let stateActiveCard = {};
    const tree = mount(<PlaceCard
      data={dataMock}
      onImgClick={() => {
        stateActiveCard = dataMock;
      }}
      onImgMouseOver={jest.fn()}
      onImgMouseOut={jest.fn()}
    />);
    const cardImgLink = tree.find(`.place-card__image-wrapper a`);
    cardImgLink.simulate(`click`);
    expect(stateActiveCard).toEqual(dataMock);
  });
});
