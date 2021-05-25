import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  useMediaQuery,
  CardMedia,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
  text: {
    color: 'black',
  },
}))

const NavBar3 = (props) => {
  const { order, auth } = props
  const classes = useStyles()

  const xsMatch = useMediaQuery('(min-width:410px)')
  const smMatch = useMediaQuery('(min-width:600px)')
  const sevenFiftyMatch = useMediaQuery('(min-width:750px)')

  return (
    <Container>
      <div
        className={classes.root}
        style={{ backgroundColor: 'white', color: 'white' }}
        xs={2}
      >
        <AppBar
          position="static"
          className={classes.appBar}
          style={{
            backgroundColor: '#fafafa',
            boxShadow: 'none',
            marginTop: '0.5rem',
          }}
        >
          <Toolbar>
            <Grid
              container
              direction={!sevenFiftyMatch ? 'column' : 'row'}
              alignItems="center"
              style={{ justifyContent: 'space-between' }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                style={{ display: 'flex' }}
              >
                {/* <Button
                  component={Link}
                  to="/customer/"
                  style={{ textDecoration: 'none' }}
                >
                  <Logo />
                </Button>

                <Typography variant="h5" className={classes.title}>
                  Snacks in a Van!
                </Typography> */}
                <CardMedia
                  component={Link}
                  to="/customer/"
                  style={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component="img"
                    image={`/navLogo2.png`}
                    title="Food Truck"
                    style={{ height: '80px' }}
                  />
                </CardMedia>
              </Grid>

              <Grid
                item
                xs={12}
                sm={7}
                md={6}
                lg={4}
                style={{
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  width: !xsMatch ? '100%' : '',
                }}
              >
                <Grid
                  container
                  direction={!xsMatch ? 'column' : 'row'}
                  spacing={!xsMatch ? 1 : 0}
                  style={{
                    justifyContent: !sevenFiftyMatch ? 'center' : 'flex-end',
                    // alignItems: !xsMatch ? 'stretch' : 'center',
                    alignItems: 'stretch',
                  }}
                  justify="flex-end"
                  // alignItems={!xsMatch ? 'stretch' : 'center'}
                  alignItems="stretch"
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' }}
                    >
                      <Button
                        component={Link}
                        to="/customer/"
                        style={{ textDecoration: 'none' }}
                      >
                        Find a Van
                      </Button>
                    </Button>
                  </Grid>
                  <Grid item style={{ marginLeft: !xsMatch ? '0px' : '0.5em' }}>
                    <Button
                      variant="outlined"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' }}
                    >
                      <Button
                        component={Link}
                        to="/customer/login"
                        style={{ textDecoration: 'none' }}
                      >
                        {auth ? jwt.decode(auth).given_name : 'Log in'}
                      </Button>
                    </Button>
                  </Grid>
                  <Grid item style={{ marginLeft: !xsMatch ? '0px' : '0.5em' }}>
                    <Button
                      variant="outlined"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' }}
                    >
                      <Button
                        component={Link}
                        to="/customer/myorder"
                        style={{ textDecoration: 'none' }}
                      >
                        My Order{' '}
                        {order == null ? (
                          ''
                        ) : (
                          <>
                            (
                            {Object.keys(order.items)
                              .map((key) => order.items[key].quantity)
                              .reduce((a, b) => a + b, 0)}
                            )
                          </>
                        )}
                      </Button>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </Container>
  )
}

export default NavBar3
