import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Snackbar,
  Box,
  TextField,
  ThemeProvider,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import theme from '../../theme'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { API_URL, useConfig } from '../../constants'
import { formatDateTime, checkModifyWindow } from '../../HelperFunctions'
import OrderCardTable from './OrderCardTable'
import OrderCardRating from './OrderCardRating'

const columns = ['Item', 'Qty', 'Subtotal']
const checkmark = '\uD83D\uDDF9'
const emptyBox = '\u2610'

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

// Individual Order for Customer
const OrderCard = (props) => {
  const { order, auth, removeOrder, itemDict } = props

  const [vendor, setVendor] = useState('')
  const [open, setOpen] = useState(false)

  const classes = useStyles()
  const { loading, config } = useConfig()

  // Handle pop up notifications for cancel order
  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // If a customer cancels an order
  const handleCancelOrder = (e) => {
    e.preventDefault()
    console.log('cancelling order')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    axios
      .delete(`${API_URL}/vendors/${order.vendor}/orders/${order._id}`, {
        headers,
      })
      .then((res) => {
        console.log('deleted order')
        removeOrder(order._id)
        changeOpen()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Get vendor's name
  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    axios(`${API_URL}/vendors/${order.vendor}`, {
      headers,
    }).then((res) => {
      console.log(res.data.van_name)
      setVendor(res.data.van_name)
    })
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          className={classes.root}
          variant="outlined"
          style={{ marginTop: '20px' }}
        >
          {Object.keys(itemDict).length !== 0 && (
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                display="inline"
              >
                Order{' '}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                display="inline"
                style={{ color: '#FAA545' }}
              >
                #{parseInt(order._id.slice(-4), 16).toString().slice(-4)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bought from {vendor}{' '}
                {order.modified ? `on ${formatDateTime(order.modified)}` : null}
              </Typography>

              <Grid item>
                {order.fulfilled ? (
                  <>
                    <p
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        color: 'green',
                      }}
                    >
                      <td>Fulfilled {checkmark}</td>
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      color: 'grey',
                    }}
                  >
                    <td>Fulfilled {emptyBox}</td>
                  </p>
                )}

                {order.picked_up ? (
                  <>
                    <p
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        color: 'green',
                      }}
                    >
                      <td>Picked Up {checkmark}</td>
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      color: 'grey',
                    }}
                  >
                    <td>Picked Up {emptyBox}</td>
                  </p>
                )}
              </Grid>

              <OrderCardTable order={order} itemDict={itemDict} />

              <Grid container style={{ justifyContent: 'space-around' }}>
                {/*Customer can only change or cancel order if order is unfulfilled AND it is within the time limit*/}
                {loading ? null : !order.fulfilled &&
                  checkModifyWindow(order.modified, config.modify_time) ? (
                  <Grid item>
                    <Button variant="outlined" color="orange">
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        component={Link}
                        color="inherit"
                        to={{
                          pathname: `/customer/modify/${order.vendor}/${order._id}`,
                          order: order,
                        }}
                        style={{ textDecoration: 'none' }}
                      >
                        Modify Order
                      </Typography>
                    </Button>
                  </Grid>
                ) : null}

                {loading ? null : !order.fulfilled &&
                  checkModifyWindow(order.modified, config.modify_time) ? (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="orange"
                      onClick={handleCancelOrder}
                    >
                      <Typography
                        variant="button"
                        color="orange"
                        display="block"
                        gutterBottom
                      >
                        Cancel Order
                      </Typography>
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
              <OrderCardRating auth={auth} order={order} />
            </CardContent>
          )}
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message="Order cancelled!"
        />
      </ThemeProvider>
    </>
  )
}

export default OrderCard
