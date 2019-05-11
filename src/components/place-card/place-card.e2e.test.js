import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';

configure({adapter: new Adapter()});

const dataMock = {
  title: `Beautiful & luxurious apartment at great location`,
  src: `img/apartment-01.jpg`,
  price: 120,
  rating: 4.7,
  type: `Apartment`,
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
    />);
    const cardImgLink = tree.find(`.place-card__image-wrapper a`);
    cardImgLink.simulate(`click`);
    expect(stateActiveCard).toEqual(dataMock);
  });
});
