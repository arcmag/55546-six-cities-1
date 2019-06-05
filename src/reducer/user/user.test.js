import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionType,
  Operation,
  ActionCreator,
  reducer,
} from "./user";

const SUCCESS_STATUS = 200;

describe(`Test server operation reducer user`, () => {
  it(`sign in`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const signIn = Operation.signIn();

    apiMock
      .onPost(`/login`)
      .reply(SUCCESS_STATUS, {data: true});

    return signIn(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SIGN_IN,
          payload: {
            avatarUrl: undefined,
            email: undefined,
            id: undefined,
            isPro: undefined,
            name: undefined,
          }});

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });
      });
  });

  it(`check user authorization`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const checkAuthorization = Operation.checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(SUCCESS_STATUS, {data: true});

    return checkAuthorization(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SIGN_IN,
          payload: {
            avatarUrl: undefined,
            email: undefined,
            id: undefined,
            isPro: undefined,
            name: undefined,
          },
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });
      });
  });
});

describe(`Test action creator reducer user`, () => {
  it(`sign in`, () => {
    /* eslint-disable */
    expect(ActionCreator.signIn({
      avatar_url: `user_url`,
      email: `user@mail.ru`,
      id: 1,
      is_pro: true,
      name: `user name`,
    })).toEqual({
      payload: {
        avatarUrl: `user_url`,
        email: `user@mail.ru`,
        id: 1,
        isPro: true,
        name: `user name`,
      },
      type: ActionType.SIGN_IN
    });
    /* eslint-enable */
  });

  it(`set select city`, () => {
    expect(ActionCreator.setSelectCity(`test city name`)).toEqual({
      payload: `test city name`,
      type: ActionType.SET_SELECT_CITY
    });
  });

  it(`require authorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      payload: true,
      type: ActionType.REQUIRED_AUTHORIZATION
    });
  });
});

describe(`Test reducer user`, () => {
  it(`sign in`, () => {
    expect(reducer({user: {}}, {
      type: ActionType.SIGN_IN,
      payload: {id: 1, name: `username`}
    })).toEqual({
      user: {id: 1, name: `username`}
    });
  });

  it(`set select city`, () => {
    expect(reducer({selectCity: ``}, {
      type: ActionType.SET_SELECT_CITY,
      payload: `test city name`
    })).toEqual({
      selectCity: `test city name`
    });
  });

  it(`required authorization`, () => {
    expect(reducer({isAuthorizationRequired: false}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    })).toEqual({
      isAuthorizationRequired: true
    });
  });
});
