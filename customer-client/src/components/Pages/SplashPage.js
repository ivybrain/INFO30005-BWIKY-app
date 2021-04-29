import { Container, Paper, Typography, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import NearestVans from '../SplashPage/NearestVans'
import VanMap from '../SplashPage/VanMap'
import axios from 'axios'
import { API_URL } from '../../constants'

const VAN_LIMIT = 5

const SplashPage = (props) => {
  const { location } = props
  // Get Vans
  const [vans, setVans] = useState(null)

  useEffect(() => {
    if (location) {
      const headers = { 'Access-Control-Allow-Origin': '*' }

      // axios(`${API_URL}/vendors`, { headers })
      axios(
        `http://localhost:8080/vendors?lat=${location.coords.latitude}&long=${location.coords.longitude}&limit=${VAN_LIMIT}`,
        {
          headers,
        },
      )
        .then((res) => {
          console.log(res.data)
          setVans(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [location])

  // Get Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log('Latitude is :', position.coords.latitude)
      // console.log('Longitude is :', position.coords.longitude)
      props.setLocation(position)
    })
  }, [])

  return (
    <div
      style={{
        background: `url(${process.env.PUBLIC_URL}/SplashPageBackground2.jpg)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        position: 'relative',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '700px',
        width: '90%',
      }}
    >
      <Container>
        <Typography
          variant="h3"
          style={{ color: 'white', paddingTop: '50px' }}
          fontWeight="bold"
        >
          Get your SNACKS
        </Typography>
        <Typography
          variant="h3"
          style={{
            color: 'white',
            paddingTop: '20px',
            paddingBottom: '40px',
          }}
          fontWeight="bold"
        >
          from a VAN
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: 'white',
          }}
          fontStyle="italic"
        >
          find us all over Melbourne
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: 'white',
            paddingBottom: '60px',
          }}
          fontStyle="italic"
        >
          search for vans near you and order now for an easy pick-up!
        </Typography>

        <form
          autoComplete="off"
          noValidate
          style={{
            width: '100%',
            marginLeft: 'auto',
            paddingBottom: '50px',
          }}
        >
          <TextField
            defaultValue="Enter a location"
            variant="outlined"
            style={{
              width: '50%',
              background: 'white',
              marginLeft: 'auto',
              // paddingLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '8px',
              size: 'large',
            }}
          />
          {/* <Button>Find my location!</Button> */}
        </form>
        <Typography
          variant="h5"
          style={{
            color: 'white',
          }}
          fontStyle="italic"
        >
          Location:{' '}
          {location == null
            ? 'no location'
            : `${location.coords.latitude}, ${location.coords.longitude}`}
        </Typography>

        <VanMap vans={vans}></VanMap>
        <Paper elevation={0} style={{ marginTop: '40px' }}>
          {vans === null ? '' : <NearestVans vans={vans}></NearestVans>}
        </Paper>
      </Container>
    </div>
  )
}

export default SplashPage
