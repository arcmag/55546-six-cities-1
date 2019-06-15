import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {BrowserRouter} from "react-router-dom";

import PlaceCard from './place-card';

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

describe(`Test PlaceCard`, () => {
  it(`Test PlaceCard renderer`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCard
            data={dataMock}
            onImgClick={jest.fn()}
            addHotelInFavorite={jest.fn()}
          />
        </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
