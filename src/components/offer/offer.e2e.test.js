import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Offer} from './offer';

configure({adapter: new Adapter()});

const mock = {
  isAuthorizationRequired: true,
  comments: [],
  offers: [{
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
    id: -1,
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
  }],
};

describe(`e2e test Offer`, () => {
  it(`test menu item click`, () => {
    const onAddHotelInFavoriteFn = jest.fn();
    const tree = mount(<Offer
      loadHotelComments={jest.fn()}
      hotelCommentPost={jest.fn()}
      onAddHotelInFavorite={onAddHotelInFavoriteFn}
      onSetActionCard={jest.fn()}
      offers={mock.offers}
      comments={mock.comments}
      isAuthorizationRequired={mock.isAuthorizationRequired}
    />);

    const buttonFavorite = tree.find(`.property__bookmark-button`).first();
    buttonFavorite.simulate(`click`);
    expect(onAddHotelInFavoriteFn).toHaveBeenCalledTimes(1);
  });
});
