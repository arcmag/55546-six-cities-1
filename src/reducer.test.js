import {reducer} from './reducer';
import offers from './mocks/offers';

describe(`Test reducer`, () => {
  it(`set city`, () => {
    expect(reducer({}, {
      type: `SET_CITY`,
      payload: `Paris`,
    })).toEqual({
      city: `Paris`
    });
  });

  it(`get offers`, () => {
    expect(reducer({}, {
      type: `GET_OFFERS`
    })).toEqual({
      offers
    });
  });
});
