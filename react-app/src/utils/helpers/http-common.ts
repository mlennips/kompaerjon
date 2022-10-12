

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import LocalStorageService from '../../services/LocalStorageService';
const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
  baseURL: "http://localhost:27619/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : 'Bearer ' + LocalStorageService.get('token') 
  }
});
export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 250 });

//export default process.env.isAxioMock || process.env.NODE_ENV == 'development' ? axiosMockInstance : axiosLiveInstance;
export default axiosLiveInstance;