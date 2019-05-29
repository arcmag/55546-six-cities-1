const initialState = {
  hotels: [],
  cities: [],
};

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  SET_CITIES_LIST: `SET_CITIES_LIST`,
  SET_SELECT_CITY: `SET_SELECT_CITY`,
};

const ActionCreator = {
  setCitiesList: (hotels) => {
    let cities = [];

    if (hotels) {
      cities = [...new Set(hotels.map((it) => it.city.name))].slice(0, 6);
    }

    return {
      type: ActionType.SET_CITIES_LIST,
      payload: cities,
    };
  },
  loadHotels: (hotels) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: hotels,
    };
  },
};

const Operation = {
  loadHotels: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadHotels(response.data));
        dispatch(ActionCreator.setCitiesList(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return Object.assign({}, state, {
        hotels: action.payload,
      });
    case ActionType.SET_CITIES_LIST:
      return Object.assign({}, state, {
        cities: action.payload,
      });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
