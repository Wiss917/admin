import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

const NotFound: React.FC = () => {
  useEffect(() => {
    // todo 重定向 登陆或首页
  }, []);
  return (
    <Container fixed>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="div">
            404
          </Typography>
          <Divider flexItem orientation="vertical" variant="middle" sx={{
            marginX: 2
          }} />
          <Typography variant="overline" component="div">
            This page could not be found.
          </Typography>
        </Box>
      </Grid>
    </Container>
  );
};

export default NotFound;
