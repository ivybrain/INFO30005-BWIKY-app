import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
import jwt from 'jsonwebtoken'


const Checkin = (props) => {
  const { auth } = props


  return (
    <ThemeProvider theme={theme}>
       <Grid container direction="row" justify="center">
        <Container
          maxWidth="sm"
          style={{
            marginTop: '5%',
          }}
        >

          <Grid container direction="column" justify="center" spacing={3}>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="h3">Welcome Back {auth ? jwt.decode(auth).van_name : null}!</Typography>
          </Grid>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="subtitle">
              Please enter your location to check in.
            </Typography>
          </Grid>
            <Grid item style={{ margin: 'auto'}}>
              <TextField variant="outlined" label="Location" color='orange'></TextField>
            </Grid>

            <Grid item style={{ margin: 'auto' }}>
              <Button
                component={Link}
                to={'/vendor/orders'}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained" color='orange' disableElevation>
                  Check In
                </Button>
              </Button>
            </Grid>

          </Grid>
        </Container>
      </Grid>
     </ThemeProvider>
  )
}

export default Checkin
