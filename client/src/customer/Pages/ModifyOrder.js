import {
  Button,
  Container,
  Grid,
  Snackbar,
  Typography,
  ThemeProvider,
} from '@material-ui/core'
import theme from '../../theme'
import { useEffect, useState } from 'react'
import MMenuItem from '../ModifyOrder/MMenuItem'
import axios from 'axios'
import { API_URL } from '../../constants'
import { Link } from 'react-router-dom'

const ModifyOrder = (props) => {
  const { auth, menu, setMenu, order } = props
  const vendor_id = props.match.params.vendor_id
  const order_id = props.match.params.order_id

  const [modifiedOrder, setModifiedOrder] = useState(null)

  // Create a copy of the order to be used for modification
  useEffect(() => {
    setModifiedOrder(order)
  }, [order])

  const [open, setOpen] = useState(false)

  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Get the order to modify
  useEffect(() => {
    if (!modifiedOrder && auth) {
      console.log('getting order')
      const headers = {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${auth}`,
      }

      axios(`${API_URL}/vendors/${vendor_id}/orders/${order_id}`, {
        headers,
      })
        .then((res) => {
          setModifiedOrder(res.data)
          // setMOrderDicted({...res.data, items:})
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  // Get the menu
  useEffect(() => {
    if (!menu) {
      console.log('getting menu')
      const headers = { 'Access-Control-Allow-Origin': '*' }

      axios(`${API_URL}/items`, {
        headers,
      })
        .then((res) => {
          setMenu(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  const handleUpdateOrder = (e) => {
    e.preventDefault()

    console.log('getting vendor')
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    console.log(modifiedOrder)

    axios
      .patch(
        `${API_URL}/vendors/${modifiedOrder.vendor}/orders/${modifiedOrder._id}`,
        modifiedOrder,
        {
          headers,
        },
      )
      .then((res) => {
        changeOpen()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!auth) {
    return (
      <Container>
        <p>Please sign in before modifying an order!</p>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography gutterBottom variant="h5" component="h2" display="inline">
          Updating Order{' '}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          display="inline"
          style={{ color: '#FAA545' }}
        >
          #{parseInt(order_id.slice(-4), 16).toString().slice(-4)}
        </Typography>

        {menu === null ? (
          ''
        ) : (
          <>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ marginTop: '2rem' }}
            >
              {menu.map((menuItem, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <MMenuItem
                    key={idx}
                    menuItem={menuItem}
                    modifiedOrder={modifiedOrder}
                    setModifiedOrder={setModifiedOrder}
                    // vendor={vanData._id}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'space-around',
                marginTop: '2rem',
                marginBottom: '1rem',
              }}
            >
              <Grid item>
                <Button color="orange" variant="outlined">
                  <Button
                    color="orange"
                    component={Link}
                    to={`/customer/orders`}
                    style={{ textDecoration: 'none' }}
                  >
                    Back to My Orders
                  </Button>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="orange"
                  onClick={handleUpdateOrder}
                >
                  <Typography
                    variant="button"
                    color="orange"
                    display="block"
                    gutterBottom
                  >
                    Update Order
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message="Order Modified!"
        />
      </Container>
    </ThemeProvider>
  )
}

export default ModifyOrder
