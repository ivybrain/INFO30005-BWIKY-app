import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

const Login = () => {
  return (
    <Container>
      <Typography variant="h2">Welcome back!</Typography>
      <Typography variant="subtitle">Sign in to start ordering</Typography>
      <form noValidate autoComplete="off">
        <Grid container direction="column">
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              variant="outlined"
            />
          </Grid>
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              required
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

export default Login
