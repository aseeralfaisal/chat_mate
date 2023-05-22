import axios from 'axios';

const baseURL = process.env.BASE_URL;

const Api = axios.create({ baseURL });


Api.interceptors.request.use(
  function (config: any) {
    // const csrf = document.cookie.split('=')[1];
    // config.withCredentials = true;
    // config.headers['x-csrf-token'] = csrf
    return config;
  },
  function (error) {
    if (!(error instanceof Error)) return;
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: Error) {
    if (!(error instanceof Error)) return;
    return Promise.reject(error);
  }
);

export default Api;
