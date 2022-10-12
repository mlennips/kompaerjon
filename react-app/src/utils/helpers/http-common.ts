

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import AuthService from '../../services/AuthService';
const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
  baseURL: "http://localhost:27619/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : 'Bearer ' + AuthService.getToken()
  }
});
export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 250 });

//export default process.env.isAxioMock || process.env.NODE_ENV == 'development' ? axiosMockInstance : axiosLiveInstance;
export default axiosLiveInstance;