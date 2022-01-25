import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Checkbox,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import {
  useLocation,
  useNavigate,
  Location as RouterLocation,
} from 'react-router';
import { getUserInfo } from 'api/login';
import useCustomAlert from 'hooks/useCustomAlert';
import md5 from 'js-md5';

type Fields = {
  email: string;
  password: string;
};

type LocationState = {
  from: RouterLocation;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [setCustomAlert, Alert] = useCustomAlert({
    severity: 'error',
    text: '密码错误！',
    show: false,
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fields, setFields] = useState<Fields>({
    email: '',
    password: '',
  });
  const [valid, setValid] = useState(true);
  const isError = (field: keyof Fields) => !valid && !fields[field];

  const handleChange =
    (field: keyof Fields) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [field]: value,
      });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValid(Object.values(fields).every((s) => s));
    const { email: username, password } = fields;

    const { access_token } = await getUserInfo({
      tenantId: '000000',
      username,
      password: md5(password),
      grant_type: 'password',
      scope: 'all',
      type: 'account',
    });

    if (!access_token) {
      setCustomAlert((s) => ({
        ...s,
        show: true,
      }));
      return;
    }

    localStorage.setItem('token', access_token);

    setCustomAlert(() => ({
      text: '登陆成功！',
      autoHideDuration: 500,
      severity: 'success',
      show: true,
    }));

    setTimeout(() => {
      navigate((state as LocationState)?.from?.pathname || '/');
    }, 500);
  };

  useEffect(() => {
    // todo remember me
    console.log(state);
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {Alert}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onInvalidCapture={() => {
              setValid(false);
            }}
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={fields.email}
              error={isError('email')}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange('email')}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type={showPassword ? 'input' : 'password'}
              id="password"
              autoComplete="current-password"
              value={fields.password}
              error={isError('password')}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => {
                        setShowPassword((show) => !show);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, checked) => {
                    const accounts = (
                      localStorage.getItem('accounts') || ''
                    ).split(',');
                  }}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* todo find password page */}
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
