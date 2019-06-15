import * as React from 'react';
import * as renderer from 'react-test-renderer';

import PlaceList from './place-list';

const mock = {
  selectedCity: `Paris`,
  offers: []
};

describe(`Test PlaceList`, () => {
  it(`Test PlaceList renderer`, () => {
    const tree = renderer.create(<PlaceList
      renderOffers={jest.fn()}
      onAddHotelInFavorite={jest.fn()}
      onSetActionCard={jest.fn()}
      offers={mock.offers}
      selectedCity={mock.selectedCity}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
