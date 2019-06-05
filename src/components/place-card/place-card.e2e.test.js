import {BrowserRouter} from "react-router-dom";

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';

configure({adapter: new Adapter()});

const dataMock = {
  bedrooms: 1,
  city: {
    name: ``,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 10,
    },
  },
  description: ``,
  goods: [],
  host: {
    avatarUrl: ``,
    id: 1,
    isPro: true,
    name: ``,
  },
  id: 1,
  images: [],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 10,
  },
  maxAdults: 1,
  previewImage: ``,
  price: 0,
  rating: 5,
  title: ``,
  type: ``,
};

describe(`e2e test PlaceCard`, () => {
  it(`test image click`, () => {
    let stateActiveCard = {};
    const tree = mount(
        <BrowserRouter>
          <PlaceCard
            data={dataMock}
            onSetActionCard={() => {
              stateActiveCard = dataMock;
            }}
            onAddHotelInFavorite={jest.fn()}
          />
        </BrowserRouter>);
    const cardImgLink = tree.find(`.place-card__image-wrapper a`);
    cardImgLink.simulate(`click`);
    expect(stateActiveCard).toEqual(dataMock);
  });

  it(`test button favorite click`, () => {
    const onAddHotelInFavoriteFn = jest.fn();
    const tree = mount(
        <BrowserRouter>
          <PlaceCard
            data={dataMock}
            onSetActionCard={jest.fn()}
            onAddHotelInFavorite={onAddHotelInFavoriteFn}
          />
        </BrowserRouter>);

    const bookmarkButton = tree.find(`.place-card__bookmark-button`);
    bookmarkButton.simulate(`click`);
    expect(onAddHotelInFavoriteFn).toHaveBeenCalledTimes(1);
  });
});
