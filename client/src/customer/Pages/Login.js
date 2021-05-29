import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'
import { API_URL } from '../../constants'
import React from 'react';
import Link from '@material-ui/core/Link';


const Login = (props) => {
  const { auth, setAuth } = props
  const [open, setOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const history = useHistory()


  // To handle pop up
  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
    setInvalid(false)
  }

  const changeOpenInvalid = () => {
    setInvalid((invalid) => !invalid)
  }


  const handle_log_out = (event) => {
    event.preventDefault()
    setAuth(null)
    console.log('Logged Out')
  }


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
          console.log(res.data)
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


  const handle_change_details = (event) => {
    event.preventDefault()

    history.push('/customer/login')

    const headers = {
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${auth}`,
   }

   if (event.target.password.value != ""){
     const data = {
       given_name: event.target.given_name.value,
       family_name: event.target.family_name.value,
       email: event.target.email.value,
       password: event.target.password.value,
     }

     // PATCH modified customer details
     axios({
       url: `${API_URL}/customers/${jwt.decode(auth)._id}`,
       method: 'PATCH',
       data: data,
       headers: headers,
     })

     .then((res) => {
       if (res.data){
         console.log("Change details for customer %s", jwt.decode(auth)._id)
         console.log(data)

         changeOpen() // Pop up notification
       }
     })

     .catch((err) => {
       console.error(err)
     })
   }else{
     console.log("Requires password!")
     changeOpenInvalid() // Pop up asks for password
   }
  }

  return (
    <Container>
      {auth ? (
        <>
        <Typography variant="h3">Account Details</Typography>
        <br/>
        <Typography variant="subtitle">
        You are logged in as {jwt.decode(auth).given_name} {jwt.decode(auth).family_name}.
        </Typography>
        <br/>

        <Button
          component={Link}
          variant="outlined"
          to="/customer/login"
          style={{ textDecoration: 'none' }}
        >
          <Typography variant="button" display="block" onClick={handle_log_out}>
            Log Out
          </Typography>
        </Button>
        <br/>
        <br/>

              <form noValidate autoComplete="off" onSubmit={handle_change_details}>
                <Grid container direction="row">
                <Grid item style={{ marginTop: '1em' }}>
                  <TextField
                    required
                    name="given_name"
                    label="Given Name"
                    defaultValue= {jwt.decode(auth).given_name}
                    variant="filled"
                  />
                </Grid>
                <Grid item style={{ marginTop: '1em' , marginLeft:'0.5em'}}>
                  <TextField
                    required
                    name="family_name"
                    label="Family Name"
                    defaultValue= {jwt.decode(auth).family_name}
                    variant="filled"
                  />
                </Grid>
                </Grid>

                <Grid container direction="row">
                  <Grid item style={{ marginTop: '0.5em' }}>
                    <TextField
                      required
                      name="email"
                      label="Email Address"
                      defaultValue= {jwt.decode(auth).email}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: '0.5em' , marginLeft:'0.5em'}}>
                    <TextField
                      required
                      name="password"
                      type="password"
                      label="Password"
                      defaultValue= {jwt.decode(auth).password}
                      variant="filled"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ marginTop: '1em' }}
                >
                  Change Profile Details
                </Button>

                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  onClose={handleClose}
                  message="Changed Profile Details!"
                />

              </form>
            </>
      ) : (
        <>
          <Typography variant="h3">Welcome Back!</Typography>
          <br/>
          <Typography variant="subtitle">
            Please log in before confirming your order.
          </Typography>

          {/*Form for login*/}
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

          {/*Link to Customer Registration Page*/}
          <Link
            variant="body2"
            href="/customer/registration"
          >
            New to Snacks In A Van? Create an account.
          </Link>
        </>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={invalid}
        onClose={handleClose}
        message="Please input a password! (You can input a new password)."
      />

    </Container>
  )
}

export default Login
