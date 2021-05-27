import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

const LoginScreen = (props) => {
  const { auth, setAuth } = props
  
  return (
    <ThemeProvider theme={theme}>
       <Grid container direction="row" justify="center">
        <Container
          maxWidth="sm"
          style={{
            // margin: "0",
            // position: 'absolute',
            marginTop: '5%',
          }}
        >

          <Grid container direction="column" justify="center" spacing={3}>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="h3">Hello!</Typography>
          </Grid>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="subtitle">
              Please enter your van name and password to check in.
            </Typography>
          </Grid>
            <Grid item style={{ margin: 'auto' }}>
              <TextField variant="outlined" label="Van Name" color='orange'></TextField>
            </Grid>
            <Grid item style={{ margin: 'auto' }}>
              <TextField variant="outlined" label="Password" color='orange'></TextField>
            </Grid>
            <Grid item style={{ margin: 'auto' }}>
              <Button
                component={Link}
                to={'/vendor/checkin'}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained" color='orange' disableElevation>
                  Log In
                </Button>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
     </ThemeProvider>
  );
}

export default LoginScreen
