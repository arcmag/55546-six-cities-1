import axios from 'axios';

const TIME_OUT = 5000;
const BASE_URL = `https://es31-server.appspot.com/six-cities`;

const STATUS_ERROR = 403;

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === STATUS_ERROR) {
      onLoginFail();
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
