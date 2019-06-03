const initialState = {
  hotels: [],
  cities: [],
  comments: [],
};

const MAX_CITY_COUNT = 6;

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  SORT_HOTELS: `SORT_HOTELS`,
  ADD_HOTEL_IN_FAVORITE: `ADD_HOTEL_IN_FAVORITE`,
  LOAD_HOTEL_COMMENTS: `LOAD_HOTEL_COMMENTS`,
  HOTEL_COMMENT_POST: `HOTEL_COMMENT_POST`,
  SET_CITIES_LIST: `SET_CITIES_LIST`,
  SET_SELECT_CITY: `SET_SELECT_CITY`,
};

const SortType = {
  DEFAULT: `default`,
  MAX_PRICE: `max-price`,
  MIN_PRICE: `min-price`,
  MAX_RATE: `max-rate`,
};

const hotelsDataAdapter = (hotels) => hotels.map((it) => {
  return {
    bedrooms: it.bedrooms,
    city: it.city,
    description: it.description,
    goods: it.goods,
    host: {
      avatarUrl: it.host.avatar_url,
      id: it.host.id,
      isPro: it.host.is_pro,
      name: it.host.name,
    },
    id: it.id,
    images: it.images,
    isFavorite: it.is_favorite,
    isPremium: it.is_premium,
    location: it.location,
    maxAdults: it.max_adults,
    previewImage: it.preview_image,
    price: it.price,
    rating: it.rating,
    title: it.title,
    type: it.type,
  };
});

const ActionCreator = {
  setCitiesList: (hotels) => {
    let cities = [];

    if (hotels) {
      cities = [...new Set(hotels.map((it) => it.city.name))].slice(0, MAX_CITY_COUNT);
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
  sortHotels: (type) => {
    let copyHotels = JSON.parse(JSON.stringify(initialState.hotels));
    let newHotels = null;
    switch (type) {
      case SortType.MAX_PRICE:
        newHotels = copyHotels.sort((a, b) => b.price - a.price);
        break;
      case SortType.MIN_PRICE:
        newHotels = copyHotels.sort((a, b) => a.price - b.price);
        break;
      case SortType.MAX_RATE:
        newHotels = copyHotels.sort((a, b) => b.rating - a.rating);
        break;
    }

    if (!newHotels) {
      newHotels = JSON.parse(JSON.stringify(initialState.hotels));
    }

    return {
      type: ActionType.SORT_HOTELS,
      payload: newHotels,
    };
  },
  loadHotelComments: (comments) => {
    const updateComments = comments.map((it) => {
      return {
        comment: it.comment,
        date: it.date,
        id: it.id,
        rating: it.rating,
        user: {
          avatarUrl: it.user.avatar_url,
          id: it.user.id,
          isPro: it.user.is_pro,
          name: it.user.name,
        }
      };
    });

    return {
      type: ActionType.LOAD_HOTEL_COMMENTS,
      payload: updateComments,
    };
  },
  hotelCommentPost: (comments) => {
    return {
      type: ActionType.HOTEL_COMMENT_POST,
      payload: comments,
    };
  }
};

const Operation = {
  loadHotels: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = hotelsDataAdapter(response.data);
        initialState.hotels = JSON.parse(JSON.stringify(hotels));
        dispatch(ActionCreator.loadHotels(hotels));
        dispatch(ActionCreator.setCitiesList(hotels));
      });
  },
  loadHotelComments: (hotelId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        dispatch(ActionCreator.loadHotelComments(response.data));
      });
  },
  hotelCommentPost: (hotelId, data, resolve, reject) => (dispatch, _getState, api) => {
    return api.post(`/comments/${hotelId}`, data)
      .then((response) => {
        dispatch(ActionCreator.loadHotelComments(response.data));
        resolve();
      })
      .catch(() => {
        reject();
      });
  },
  addHotelInFavorite: (hotelId, status) => (dispatch, _getState, api) => {
    return api.post(`favorite/${hotelId}/${status}`)
      .then(() => {
        dispatch(Operation.loadHotels());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return Object.assign({}, state, {
        hotels: action.payload,
      });
    case ActionType.SORT_HOTELS:
      return Object.assign({}, state, {
        hotels: action.payload,
      });
    case ActionType.ADD_HOTEL_IN_FAVORITE:
      return Object.assign({}, state, {
        hotels: action.payload,
      });
    case ActionType.LOAD_HOTEL_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload,
      });
    // case ActionType.HOTEL_COMMENT_POST:
    //   return Object.assign({}, state, {
    //     comments: action.payload,
    //   });
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
