import axios from 'axios';

const timeout = 5000;
const baseURL = `https://es31-server.appspot.com/six-cities`;

const STATUS_ERROR = 403;

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL,
    timeout,
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
