import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'
import { API_URL } from '../../constants'

const Registration = (props) => {
  const { auth, setAuth } = props

  const history = useHistory()

  const handle_form_submit = (event) => {
    event.preventDefault()

    history.push('/customer/login')

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }

    const data = {
      given_name: event.target.given_name.value,
      family_name: event.target.family_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }

    // POST customer registration data to API
    // Creates a new customer
    axios({
      url: `${API_URL}/customers`,
      method: 'POST',
      data: data,
      headers: headers,
    })

    .then(() => {
      if (data){
        console.log("Create new customer")
        console.log(data)
      }
    })

    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <Container>
      <Typography variant="h3">Create an account.</Typography>
      <br/>
      {auth ? (
        `You are logged in as ${jwt.decode(auth).given_name} ${
          jwt.decode(auth).family_name
        }`
      ) : (
        <>
          <Typography variant="subtitle">
            Please register to start ordering.
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handle_form_submit}>
            <Grid container direction="row">
            <Grid item style={{ marginTop: '1em' }}>
              <TextField
                required
                name="given_name"
                label="Given Name"
                variant="outlined"
              />
            </Grid>
            <Grid item style={{ marginTop: '1em' , marginLeft:'0.5em'}}>
              <TextField
                required
                name="family_name"
                label="Family Name"
                variant="outlined"
              />
            </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid item style={{ marginTop: '0.5em' }}>
                <TextField
                  required
                  name="email"
                  label="Email Address"
                  variant="outlined"
                />
              </Grid>
              <Grid item style={{ marginTop: '0.5em' , marginLeft:'0.5em'}}>
                <TextField
                  required
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={{ marginTop: '1em' }}
            >
              Register
            </Button>
          </form>
        </>
      )}
    </Container>
  )
}

export default Registration
