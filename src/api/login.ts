import instance from 'utils/axios';
import qs from 'qs';

type UserInfo = {
  tenantId: string;
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  type: string;
};

export function getUserInfo(data: UserInfo): Promise<{ access_token: string }> {
  return instance.post('/blade-auth/oauth/token', qs.stringify(data), {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      isLogin: '',
    },
  });
}
