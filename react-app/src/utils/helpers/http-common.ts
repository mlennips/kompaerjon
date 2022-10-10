

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 250 });
export default process.env.isAxioMock || process.env.NODE_ENV == 'development' ? axiosMockInstance : axiosLiveInstance;