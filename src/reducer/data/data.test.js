import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionType,
  Operation,
  ActionCreator,
  reducer,
} from "./data";

const SUCCESS_STATUS = 200;

describe(`Test server operation reducer data`, () => {
  it(`get data hotels`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const hotelsLoader = Operation.loadHotels();

    apiMock
      .onGet(`/hotels`)
      .reply(SUCCESS_STATUS, []);

    return hotelsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTELS,
          payload: [],
        });
      });
  });

  it(`get hotel comments`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadHotelComments = Operation.loadHotelComments(0);

    apiMock
      .onGet(`/comments/`)
      .reply(SUCCESS_STATUS, []);

    return loadHotelComments(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTEL_COMMENTS,
          payload: [],
        });
      });
  });

  it(`hotel comment post`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const hotelCommentPost = Operation.hotelCommentPost(
        0,
        {rating: 5, comment: ``},
        () => {},
        () => {}
    );

    apiMock
      .onPost(`/comments/`)
      .reply(SUCCESS_STATUS, []);

    return hotelCommentPost(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTEL_COMMENTS,
          payload: [],
        });
      });
  });

  it(`add hotel in favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const addHotelInFavorite = Operation.addHotelInFavorite(0, 0);

    apiMock
      .onPost(`favorite/`)
      .reply(SUCCESS_STATUS, []);

    return addHotelInFavorite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });
});

describe(`Test action creator reducer data`, () => {
  it(`set cities list`, () => {
    expect(ActionCreator.setCitiesList([])).toEqual({
      payload: [],
      type: ActionType.SET_CITIES_LIST
    });
  });

  it(`load hotels`, () => {
    expect(ActionCreator.loadHotels([])).toEqual({
      payload: [],
      type: ActionType.LOAD_HOTELS
    });
  });

  it(`sort hotels`, () => {
    expect(ActionCreator.sortHotels([])).toEqual({
      payload: [],
      type: ActionType.SORT_HOTELS
    });
  });

  it(`load hotel comments`, () => {
    expect(ActionCreator.loadHotelComments([])).toEqual({
      payload: [],
      type: ActionType.LOAD_HOTEL_COMMENTS
    });
  });

  it(`hotel comment post`, () => {
    expect(ActionCreator.hotelCommentPost([])).toEqual({
      payload: [],
      type: ActionType.HOTEL_COMMENT_POST
    });
  });
});

describe(`Test reducer data`, () => {
  it(`load hotels`, () => {
    expect(reducer({hotels: []}, {
      type: ActionType.LOAD_HOTELS,
      payload: [{}, {}, {}]
    })).toEqual({
      hotels: [{}, {}, {}]
    });
  });

  it(`sort hotels`, () => {
    expect(reducer({hotels: []}, {
      type: ActionType.SORT_HOTELS,
      payload: [{}, {}, {}]
    })).toEqual({
      hotels: [{}, {}, {}]
    });
  });

  it(`load hotel comments`, () => {
    expect(reducer({comments: []}, {
      type: ActionType.LOAD_HOTEL_COMMENTS,
      payload: [{}, {}, {}, {}, {}]
    })).toEqual({
      comments: [{}, {}, {}, {}, {}]
    });
  });

  it(`set cities list`, () => {
    expect(reducer({cities: []}, {
      type: ActionType.SET_CITIES_LIST,
      payload: [`city 1`, `city 2`]
    })).toEqual({
      cities: [`city 1`, `city 2`]
    });
  });
});
