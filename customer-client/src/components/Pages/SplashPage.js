import { Container, Paper } from '@material-ui/core'
import NearestVans from '../NearestVans/NearestVans'
import VanMap from '../NearestVans/VanMap'

const SplashPage = (props) => {
  return (
    <Container>
      <VanMap></VanMap>
      <Paper elevation={0} style={{ marginTop: '40px' }}>
        <NearestVans></NearestVans>
      </Paper>
    </Container>
  )
}

export default SplashPage
