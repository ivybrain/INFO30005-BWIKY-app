import { Container, Paper, Typography, TextField } from '@material-ui/core'
import NearestVans from '../SplashPage/NearestVans'
import VanMap from '../SplashPage/VanMap'

const SplashPage = (props) => {
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
        </form>

        <VanMap></VanMap>
        <Paper elevation={0} style={{ marginTop: '40px' }}>
          <NearestVans></NearestVans>
        </Paper>
      </Container>
    </div>
  )
}

export default SplashPage
