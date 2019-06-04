import renderer from 'react-test-renderer';

import MainMap from './main-map';

const mock = {
  selectedCity: `Paris`,
  offers: [
    {
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
    },
    {
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
    }
  ]
};

describe(`Test MainMap`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<MainMap
      offers={mock.offers}
      selectedCity={mock.selectedCity}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
