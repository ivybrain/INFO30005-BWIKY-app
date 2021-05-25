import { Container, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import NearestVans from '../SplashPage/NearestVans'
import VanMap from '../SplashPage/VanMap'
import axios from 'axios'
import { API_URL } from '../../constants'

const VAN_LIMIT = 5

const SplashPage = (props) => {
  const { location, setLocation, vans, setVans } = props

  // Get Vans
  useEffect(() => {
    if (location && !vans) {
      console.log('getting vans')
      const headers = { 'Access-Control-Allow-Origin': '*' }

      axios(
        `${API_URL}/vendors?lat=${location.coords.latitude}&long=${location.coords.longitude}&limit=${VAN_LIMIT}`,
        {
          headers,
        },
      )
        .then((res) => {
          // console.log(res)
          setVans(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [location])

  // Get Geolocation
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
      setLocation({ coords: { latitude: -37.80435, longitude: 144.96296 } })
    }
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

        {/* <form
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
          {/* <Button>Find my location!</Button> }
        </form> */}
        <br></br>
        <Typography
          variant="body"
          style={{
            color: 'white',
          }}
          fontStyle="italic"
        >
          Your Location:{' '}
          {location == null
            ? 'No location, please enable location in your browser!'
            : `(${Math.round(location.coords.latitude * 10000) / 10000}, ${
                Math.round(location.coords.longitude * 10000) / 10000
              })`}
        </Typography>

        <VanMap vans={vans} location={location}></VanMap>
        <br />
        <br />
        {vans === null ? '' : <NearestVans vans={vans}></NearestVans>}
        <br />
      </Container>
    </div>
  )
}

export default SplashPage
