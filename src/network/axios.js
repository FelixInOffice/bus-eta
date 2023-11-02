import axios from 'axios';
import endpoints from '@/network/endpoints';

const axiosApp = axios.create({
  retry: 3,
  retryDelay: 1000,
});

axiosApp.interceptors.request.use(
  (config) => {
      const { params, url, data } = config;

      config.timeout = 30000;

      config.headers = {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
      }

      return config;
  },
  (error) => {
      console.log(error);
      return Promise.reject(error);
  }
);
axiosApp.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
      console.log("error " + error, error.code);
  }
);


export default axiosApp;