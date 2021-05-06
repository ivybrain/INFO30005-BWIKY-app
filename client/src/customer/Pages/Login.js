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

const Login = (props) => {
  const { setAuth } = props

  const handle_form_submit = (event) => {
    event.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    axios({
      url: `${API_URL}/customers/login`,
      method: 'POST',
      data: data,
      headers: headers,
    })
      .then((res) => {
        setAuth(res.data)
        const cst = jwt.decode(res.data)
        if (cst) {
          console.log(cst)
        } else console.err('Invalid token')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Container>
      <Typography variant="h2">Welcome back!</Typography>
      <Typography variant="subtitle">
        Please log in before confirming your order.
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handle_form_submit}>
        <Grid container direction="column">
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              required
              name="email"
              label="Email Address"
              variant="outlined"
            />
          </Grid>
          <Grid item style={{ marginTop: '1em' }}>
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
          Sign in
        </Button>
      </form>
    </Container>
  )
}

export default Login
