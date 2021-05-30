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
import { API_URL } from '../constants'
import axios from 'axios'
import { useHistory } from 'react-router'



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


// Navigation Bar for Vendor Client at top of all pages
const NavBar = (props) => {
  const { auth, setAuth } = props
  const classes = useStyles()
  const xsMatch = useMediaQuery('(min-width:410px)')
  const smMatch = useMediaQuery('(min-width:600px)')
  const sevenFiftyMatch = useMediaQuery('(min-width:750px)')
  const history = useHistory()


  // Handle Vendor check out
  const handle_check_out = (event) => {
    event.preventDefault()
    console.log('Checked Out')
    event.preventDefault()

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`,
    }

    // Vendor check out of location
    const data = {
      ready: false,
    }

    axios({
      url: `${API_URL}/vendors/${jwt.decode(auth)._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })

    .then((res) => {
      if (res.data){
        console.log("Checking Out of Location for vendor %s", jwt.decode(auth)._id)
        console.log(data)
        // Redirect to orders
        history.push('/vendor')
      }
    })

    .catch((err) => {
      console.error(err)
    })

    // Log out vendor
    setAuth(null)
  }

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
                <CardMedia
                  component={Link}
                  to="/vendor/orders"
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
                lg={5}
                style={{
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  width: !xsMatch ? '100%' : '',
                }}
              >

                {auth && (
                  <Grid
                    container
                    direction={!xsMatch ? 'column' : 'row'}
                    spacing={!xsMatch ? 1 : 0}
                    style={{
                      justifyContent: !sevenFiftyMatch ? 'center' : 'flex-end',
                      alignItems: 'stretch',
                    }}
                    justify="flex-end"
                    alignItems="stretch"
                  >
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="orange"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' }}
                    >
                      <Button
                        component={Link}
                        to="/vendor/orders"
                        color="orange"
                        style={{ textDecoration: 'none' }}
                      >
                        Current Orders
                      </Button>
                    </Button>
                  </Grid>

                  <Grid item style={{ marginLeft: !xsMatch ? '0px' : '0.5em' }}>
                    <Button
                      variant="outlined"
                      color="orange"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' }}
                    >
                      <Button
                        component={Link}
                        color="orange"
                        to="/vendor/history"
                        style={{ textDecoration: 'none' }}
                      >
                        Past Orders
                      </Button>
                    </Button>
                  </Grid>

                  <Grid item style={{ marginLeft: !xsMatch ? '0px' : '0.5em' }}>
                    <Button
                      variant="outlined"
                      color="orange"
                      className={classes.text}
                      size={!smMatch ? 'small' : 'medium'}
                      style={{ width: !xsMatch ? '100%' : '' , textDecoration: 'none'}}
                      onClick={handle_check_out}
                    >
                      <Button
                        color="orange"
                        style={{ textDecoration: 'none' }}
                      >
                      Check Out
                      </Button>
                    </Button>
                  </Grid>

                </Grid>
                )}

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </Container>
  )
}

export default NavBar
