const initialState = {
  selectCity: ``
};

const ActionType = {
  SET_SELECT_CITY: `SET_SELECT_CITY`,
};

const ActionCreator = {
  setSelectCity: (cityName) => {
    return {
      type: ActionType.SET_SELECT_CITY,
      payload: cityName,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SELECT_CITY:
      return Object.assign({}, state, {
        selectCity: action.payload,
      });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  reducer,
};
