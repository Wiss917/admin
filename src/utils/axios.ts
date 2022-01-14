import axios from 'axios';

const instance = axios.create({
  baseURL: 'api',
  timeout: 10000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
  },
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    const { headers } = config;

    if (token && headers) {
      // 请求头添加token
      headers['Blade-Auth'] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status !== 200) {
      console.log(response);
    }
    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
