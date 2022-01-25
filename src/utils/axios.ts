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
    const {
      data,
      config: { headers },
    } = response;
    const hasToken = !!localStorage.getItem('token');

    const { code, success, msg } = data;

    // 登录接口特殊处理
    const isLoginApi = Object.keys(headers || {}).includes('isLogin');

    // todo 根据 code 详细打印报错信息
    if (!isLoginApi && (code === 401 || !success)) {
      console.log(hasToken ? msg : '用户没有登录！');
    }

    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
