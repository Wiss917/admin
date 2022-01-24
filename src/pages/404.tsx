import {
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container fixed>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" component="div">
            404
          </Typography>
          <Typography variant="overline" component="div">
            This page could not be found.
          </Typography>
        </Stack>
      </Grid>
    </Container>
  );
};

export default NotFound;
