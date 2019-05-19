import offers from './mocks/offers';

const initialState = {
  city: ``,
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_CITY`: return Object.assign({}, state, {
      city: action.payload
    });
    case `GET_OFFERS`: return Object.assign({}, state, {
      offers: initialState.offers.map((it) => Object.assign({}, it))
    });
  }

  return state;
};

export {reducer};
