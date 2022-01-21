import axios, { AxiosResponse } from 'axios';
import { IResponse } from 'interfaces/api';

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
  (response: AxiosResponse<IResponse<any>>) => {
    const { status, data } = response;
    const hasToken = !!localStorage.getItem('token');
    console.log(response);

    if (status !== 200) {
      console.log(response);
    }

    const { code, success, msg } = data;

    // todo 根据 code 详细打印报错信息
    if (code === 401 || !success) {
      console.log(hasToken ? msg : '用户没有登录！');
      
      // todo remove token cache redirect to log in
    }

    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
