import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  ThemeProvider
} from '@material-ui/core'
import theme from '../../theme';
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'
import { API_URL } from '../../constants'
import React from 'react';
import Link from '@material-ui/core/Link';


// Login and profile details page
const Login = (props) => {
  const { auth, setAuth } = props
  const [open, setOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [login_invalid, setLoginInvalid] = useState(false)
  const history = useHistory()


  // To handle pop up notifications

  // Flash message that details have been changed
  const changeOpen = () => {
    setOpen((open) => !open)
  }
  // Flash message that password is required to change details
  const changeOpenInvalid = () => {
    setInvalid((invalid) => !invalid)
  }
  const changeLoginInvalid = () => {
    setLoginInvalid((login_invalid) => !login_invalid)
  }
  // Close messages
  const handleClose = () => {
    setOpen(false)
    setInvalid(false)
    setLoginInvalid(false)
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
        changeLoginInvalid() // flash invalid login message
        history.push('/customer/login') // reload login page
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
    <>
    <ThemeProvider theme={theme}>
    <Container>
      {auth ? (
        <>

        <Typography variant="h3">Account Details</Typography>

        <Grid container direction="column">
          <Grid item style={{ marginTop: '1em' }}>
            <Typography variant="subtitle">
              You are logged in as {jwt.decode(auth).given_name} {jwt.decode(auth).family_name}.
              </Typography>
          </Grid>

          {/*Log Out Button*/}
          <Grid item style={{ marginTop: '0.5em', marginBottom:'2em' }}>
            <Button
              component={Link}
              variant="contained"
              color = 'orange'
              to="/customer/login"
              disableElevation
              >
              <Typography variant="button" display="block" onClick={handle_log_out}>
                Log Out
              </Typography>
            </Button>
            </Grid>
        </Grid>

        {/*Text fields to change profile details*/}
        <form noValidate autoComplete="off" onSubmit={handle_change_details}>
            <Grid container direction="row">
                <Grid item style={{ marginTop: '1em' }}>
                  <TextField
                    required
                    name="given_name"
                    label="Given Name"
                    color = 'orange'
                    defaultValue= {jwt.decode(auth).given_name}
                    variant="filled"
                  />
                </Grid>
                <Grid item style={{ marginTop: '1em' , marginLeft:'0.5em'}}>
                  <TextField
                    required
                    name="family_name"
                    label="Family Name"
                    color = 'orange'
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
                      color = 'orange'
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
                      color = 'orange'
                      defaultValue= {jwt.decode(auth).password}
                      variant="filled"
                    />
                </Grid>
              </Grid>

              {/*Submit changed account details button*/}
              <Button
                variant="contained"
                color="orange"
                disableElevation
                style={{ marginTop: '1em' }}
              >
                Change Profile Details
              </Button>

              {/*Message flash for if details were changed succesfully*/}
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={handleClose}
                message="Changed Profile Details!"
              />

              {/*Message flash for if password was not provided for changing details*/}
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={invalid}
                onClose={handleClose}
                message="Please input a password! (You can input a new password)."
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
                  color = 'orange'
                />
              </Grid>
              <Grid item style={{ marginTop: '1em' }}>
                <TextField
                  required
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  color = "orange"
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="orange"
              disableElevation
              style={{ marginTop: '1em' , marginBottom: '1em'}}
            >
              Sign in
            </Button>

            {/*Message flash if login details were invalid*/}
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={login_invalid}
              onClose={handleClose}
              message="Invalid login details! Please try again!"
            />
          </form>

          {/*Link to Customer Registration Page*/}
          <Link
            variant="body1"
            href="/customer/registration"
            style={{color:"orange"}}
          >
            New to Snacks In A Van? Create an account.
          </Link>

        </>
      )}

    </Container>
    </ThemeProvider>
    </>
  )
}

export default Login
