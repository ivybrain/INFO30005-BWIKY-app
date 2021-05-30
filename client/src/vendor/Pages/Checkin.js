import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { API_URL } from '../../constants'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';



// Vendor Location Check In Page
const Checkin = (props) => {
  const { auth, setAuth } = props
  const [ location, setLocation ] = useState(null)
  const history = useHistory()

  // Get Geolocation of Vendor
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          `got location lat ${position.coords.latitude} long ${position.coords.longitude}`,
        )
        setLocation(position)
      })
    }
    if (!location) {
      // Default Location if geolocation cannot be retrieved
      setLocation({ coords: { latitude: -37.80435, longitude: 144.96296 } })
    }
  }, [])


  // Vendor submits a location as a text string
  const handle_form_submit = (event) => {
    event.preventDefault()

    console.log("Vendor Check In")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`,
    }

    // Send both the simple text location and the geolocation
    const data = {
      location: {
        // coordinates
        lat: location.coords.latitude,
        long: location.coords.longitude,
        // simple location as text
        simple:  event.target.location_string.value,
      },
      ready: true,
    }

    axios({
      url: `${API_URL}/vendors/${jwt.decode(auth)._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })

    .then((res) => {
      if (res.data){
        console.log(data)
        // Redirect vendor to orders page after check in
        history.push('/vendor/orders')
      }
    })

    .catch((err) => {
      console.error(err)
    })
  }


  return (
    <ThemeProvider theme={theme}>
       <Grid container direction="row" justify="center">
        <Container
          style={{
            marginTop: '5%',
          }}
        >

          {/*Header and descriptive text*/}
          <Grid container direction="column" justify="center" spacing={3}>
          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="h4">Welcome Back {auth ? jwt.decode(auth).van_name : null}!</Typography>
          </Grid>

          <Grid item style={{ margin: 'auto' }}>
            <Typography variant="subtitle">
              Please enter your location to check in.
            </Typography>
          </Grid>
          <br/>

          {/*Text field to get location string for check in*/}
          <form noValidate autoComplete="off" onSubmit={handle_form_submit}>
          <Grid container direction="column" justify="center" spacing={3}>

            <Grid item style={{ margin: 'auto'}}>
              <TextField
              required
              variant="outlined"
              label="Location"
              name="location_string"
              type="location_string"
              color='orange'></TextField>
            </Grid>

            {/* Check in button*/}
            <Grid item style={{ margin: 'auto' }}>
              <Button variant="contained" color='orange' disableElevation>
                Check In
              </Button>
            </Grid>

          </Grid>
          </form>
        </Grid>

        </Container>
      </Grid>
     </ThemeProvider>
  )
}

export default Checkin
