const initialState = {
  selectCity: ``,
  isAuthorizationRequired: true,
  user: {},
};

const ActionType = {
  SET_SELECT_CITY: `SET_SELECT_CITY`,
  SIGN_IN: `SIGN_IN`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  signIn: (status) => {
    return {
      type: ActionType.SIGN_IN,
      payload: status
    };
  },
  setSelectCity: (cityName) => {
    return {
      type: ActionType.SET_SELECT_CITY,
      payload: cityName,
    };
  },
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const Operation = {
  signIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.signIn(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      })
      .catch(() => { });
  },
  checkAuthorization: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.signIn(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      })
      .catch(() => { });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ActionType.SET_SELECT_CITY:
      return Object.assign({}, state, {
        selectCity: action.payload,
      });
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};

export {
  Operation,
  ActionCreator,
  ActionType,
  reducer,
};
