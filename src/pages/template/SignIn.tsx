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
import { useLocation } from 'react-router';

type Fields = {
  email: string;
  password: string;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setValid(Object.values(fields).every((s) => s));
    event.preventDefault();

    // todo ajax
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
