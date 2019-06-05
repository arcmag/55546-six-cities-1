import renderer from 'react-test-renderer';

import {Offer} from './offer';

const mock = {
  offers: [],
  comments: [],
  isAuthorizationRequired: false
};

describe(`Test Offer`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<Offer
      loadHotelComments={jest.fn()}
      hotelCommentPost={jest.fn()}
      onAddHotelInFavorite={jest.fn()}
      onSetActionCard={jest.fn()}
      offers={mock.offers}
      comments={mock.comments}
      isAuthorizationRequired={mock.isAuthorizationRequired}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
