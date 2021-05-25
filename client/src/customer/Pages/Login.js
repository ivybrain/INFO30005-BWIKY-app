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
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from '@material-ui/core/Link';


const Login = (props) => {
  const { auth, setAuth } = props

  const history = useHistory()

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
          // Redirect successful login to my order page
          history.push('/customer/myorder')

        } else console.err('Invalid token')
      })

      // Invalid login
      .catch((err) => {
        console.error(err)

        console.log("Invalid login")
        history.push('/customer/login')
      })
  }

  return (
    <Container>
      <Typography variant="h2">Welcome back!</Typography>
      {auth ? (
        `You are logged in as ${jwt.decode(auth).given_name} ${
          jwt.decode(auth).family_name
        }`
      ) : (
        <>
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
              style={{ marginTop: '1em' , marginBottom: '1em'}}
            >
              Sign in
            </Button>
          </form>
          <Link
            variant="body2"
            href="/customer/registration"
          >
            New to Snacks In A Van? Create an account.
          </Link>
        </>
      )}
    </Container>
  )
}

export default Login
