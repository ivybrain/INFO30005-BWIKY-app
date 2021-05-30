import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  Snackbar
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import { useState } from 'react'
import { API_URL } from '../../constants'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';



// Login Page for Vendor
const LoginScreen = (props) => {
  const { auth, setAuth } = props
  const [invalid, setInvalid] = useState(false)
  const history = useHistory()


  // Flash message that login details are incorrect
  const openInvalid = () => {
    setInvalid((invalid) => !invalid)
  }
  // Close message
  const handleClose = () => {
    setInvalid(false)
  }


  // Vendor submits details to log in
  const handle_form_submit = (event) => {
    event.preventDefault()

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }

    // Submit van name and password for log in
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

    // Get response from server
    .then((res) => {
      setAuth(res.data) // Set authentication token

      const cst = jwt.decode(res.data)
      if (cst) {
        console.log(res.data)
        console.log(cst)
        // Redirect successful login to check in page
        history.push('/vendor/checkin')
      }else{
        console.err('Invalid token')
      }
    })
      // Invalid login
      .catch((err) => {
        console.error(err)
        console.log("Invalid login")

        openInvalid() // flash invalid login message
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
        </Grid>
          <br />

          {/*Text fields to enter login details*/}
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

              {/* Log in button*/}
              <Grid item style={{ margin: 'auto' }}>
                <Button variant="contained" color='orange' disableElevation>
                  Log In
                </Button>
              </Grid>

            </Grid>
          </form>

          {/*Message flash for if login details provided are incorrect*/}
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={invalid}
            onClose={handleClose}
            message="Invalid login details! Please try again."
          />
        </Container>
      </Grid>
     </ThemeProvider>
  );
}

export default LoginScreen
