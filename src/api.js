import axios from 'axios';
import {ActionCreator} from './reducer/user/user';

const STATUS_ERROR = 403;

const timeout = 5000;
const baseURL = `https://es31-server.appspot.com/six-cities`;

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL,
    timeout,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === STATUS_ERROR) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
