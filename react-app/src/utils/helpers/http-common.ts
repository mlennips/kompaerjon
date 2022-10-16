

import axios from 'axios';
//import AxiosMockAdapter from 'axios-mock-adapter';
import AuthService from '../../services/AuthService';
//const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
  baseURL: "http://localhost:27619/api",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosLiveInstance.interceptors.request.use(function (config) {
  const token = AuthService.get()?.token ?? null;
  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

//export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 250 });

//export default process.env.isAxioMock || process.env.NODE_ENV == 'development' ? axiosMockInstance : axiosLiveInstance;
export default axiosLiveInstance;