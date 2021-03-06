// import node_modules
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from 'react-native-config';

// main

axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status === 500) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// config axios
axios.defaults.timeout = 15000;
axios.defaults.baseURL = Config.API_SERVER;
axios.defaults.headers.common.Authorization = '';

export default axios;
