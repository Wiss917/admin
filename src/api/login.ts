import { UserInfo } from 'pages/login';
import instance from 'utils/axios';
import qs from 'qs';

export function getUserInfo(data: UserInfo): Promise<{ access_token: string }> {
  return instance.post('/blade-auth/oauth/token', qs.stringify(data), {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
}
