import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

import axios from 'axios'
import jwt from 'jsonwebtoken'
import { API_URL } from '../../constants'

const Login = () => {
  return (
    <Container>
      <Typography variant="h2">Welcome back!</Typography>
      <Typography variant="subtitle">Sign in to start ordering</Typography>
      <form noValidate autoComplete="off" onSubmit={handle_form_submit}>
        <Grid container direction="column">
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              required
              name="email"
              id="outlined-required"
              label="Email Address"
              variant="outlined"
            />
          </Grid>
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              required
              name="password"
              id="outlined-required"
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
          Sign in
        </Button>
      </form>
    </Container>
  )
}

const handle_form_submit = (event) => {
  event.preventDefault()
  const headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  const data = {email: event.target.email.value, password: event.target.password.value};


  axios({url: `${API_URL}/customers/login`, method: 'POST', data: data, headers: headers})
    .then((res) => {
      console.log(res.data);
      console.log(jwt.decode(res.data));
    }).catch((err) => {console.error(err)})
}

export default Login
