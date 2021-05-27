import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

import { API_URL } from '../../constants'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';



// Login Page for Vendor
const LoginScreen = (props) => {
  const { auth, setAuth } = props

  const history = useHistory()


    const handle_form_submit = (event) => {
      event.preventDefault()

      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

      const data = {
        van_name: event.target.van_name.value,
        password: event.target.password.value,
      }

      axios({
        url: `${API_URL}/vendors/login`,
        method: 'POST',
        data: data,
        headers: headers,
      })

        .then((res) => {
          setAuth(res.data)
          const cst = jwt.decode(res.data)
          if (cst) {
            console.log(res.data)
            console.log(cst)
            // Redirect successful login to check in page
            history.push('/vendor/checkin')

          } else console.err('Invalid token')
        })

        // Invalid login
        .catch((err) => {
          console.error(err)
          console.log("Invalid login")
          history.push('/vendor')
        })
    }


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
            <Typography variant="h3">Hello!</Typography>
          </Grid>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="subtitle">
              Please enter your van name and password to log in.
            </Typography>
          </Grid>

          <br />

          <form noValidate autoComplete="off" onSubmit={handle_form_submit}>

          <Grid container direction="column" justify="center" spacing={3}>
              <Grid item style={{ margin: 'auto' }}>
                <TextField
                required
                variant="outlined"
                name="van_name"
                type="van_name"
                label="Van Name"
                color='orange'></TextField>
              </Grid>

            <Grid item style={{ margin: 'auto' }}>
              <TextField
              required
              variant="outlined"
              name="password"
              type="password"
              label="Password"
              color='orange'></TextField>
            </Grid>

            <Grid item style={{ margin: 'auto' }}>
                <Button variant="contained" color='orange' disableElevation>
                  Log In
                </Button>
            </Grid>

          </Grid>

          </form>
          </Grid>
        </Container>
      </Grid>
     </ThemeProvider>
  );
}

export default LoginScreen
