import React, { useState } from 'react';
import { TextField, Container, Grid, Button } from '@mui/material';
import { AccountCircle, Lock, Login as LoginIcon } from '@mui/icons-material';
import { getUserInfo } from '@/api/login';
import md5 from 'js-md5';
import style from '../styles/login.module.scss';

type LoginField = {
  name: string;
  password: string;
  isError: boolean;
  showPassword: boolean;
};

export type UserInfo = {
  tenantId: string;
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  type: string;
};

const Login: React.FC = () => {
  const [fieldState, setFieldState] = useState<LoginField>({
    name: '',
    password: '',
    isError: false,
    showPassword: false,
  });

  const handleChange =
    (field: keyof LoginField) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFieldState({
        ...fieldState,
        isError: !value.length,
        [field]: value,
      });
    };

  const handleClick = async () => {
    const { name, password } = fieldState;

    if (!name || !password) {
      setFieldState({
        ...fieldState,
        isError: true,
      });
      return;
    }

    const { access_token } = await getUserInfo({
      tenantId: '000000',
      username: name,
      password: md5(password),
      grant_type: 'password',
      scope: 'all',
      type: 'account',
    });

    if (!access_token) {
      // todo 处理
      return;
    }

    localStorage.setItem('token', access_token);

    // todo redirect to index
  };

  // todo 可以考虑添加keydown事件

  return (
    <div className={style.page}>
      <Container>
        <Grid
          container
          justifyContent="center"
          rowSpacing={{ xs: 3, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={10}
            md={8}
            spacing={0.5}
            container
            justifyContent="center"
            alignItems="flex-end"
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                required
                label="账号"
                placeholder="请输入账号"
                variant="standard"
                value={fieldState.name}
                error={fieldState.isError && !fieldState.name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item>
              <AccountCircle
                sx={{ color: 'action.active', mr: 1, mb: -0.5 }}
              ></AccountCircle>
            </Grid>
          </Grid>
          <Grid
            item
            xs={10}
            md={8}
            spacing={0.5}
            container
            justifyContent="center"
            alignItems="flex-end"
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="密码"
                type="password"
                placeholder="请输入密码"
                autoComplete="current-password"
                variant="standard"
                value={fieldState.password}
                error={fieldState.isError && !fieldState.password}
                onChange={handleChange('password')}
              />
            </Grid>
            <Grid item>
              <Lock sx={{ color: 'action.active', mr: 1, mb: -0.5 }}></Lock>
            </Grid>
          </Grid>
          <Grid item xs={8} md={8} container marginRight={2}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<LoginIcon />}
              onClick={handleClick}
              onKeyUp={(e) => {
                if (e.key === 'enter') {
                  handleClick();
                }
              }}
            >
              登陆
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
