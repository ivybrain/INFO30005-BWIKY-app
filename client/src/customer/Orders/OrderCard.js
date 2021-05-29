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
  ThemeProvider
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import theme from '../../theme';
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { API_URL } from '../../constants'
import { dictify ,
  formatDateTime ,
  checkModifyWindow} from '../../HelperFunctions'

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

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);



// Individual Order for Customer
const OrderCard = (props) => {
  const { order, auth, removeOrder } = props
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState("")
  const [vendor, setVendor] = useState("")
  const [menu, setMenu] = useState(null)
  const [open, setOpen] = useState(false)
  const [rating_open, setRatingOpen] = useState(false)
  var itemDict = {} // Initialise menu dictionary
  const classes = useStyles()



  // If a customer changes their rating, PATCH to database
  const postRating = (newRating) =>{

    console.log("Ratings changed to:")
    console.log(newRating)

    const headers = {
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${auth}`,
    }

    const data = {
      rating : newRating // set new rating
    }

     // PATCH customer's rating
     axios({
       url: `${API_URL}/vendors/${order.vendor}/orders/${order._id}`,
       method: 'PATCH',
       data: data,
       headers: headers,
     })

     .then((res) => {
       if (res.data){
         console.log("Changed rating for %s to", order.vendor)
         console.log(res.data)
       }
     })

     .catch((err) => {
       console.error(err)
     })
  }

  // If customer submits a comment with their rating
  const handle_comment_submit = (event) => {
    event.preventDefault()

    ratingSubmitted()

    const headers = {
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${auth}`,
   }

   const data = {
     comment : event.target.comment.value // set customer comment
   }

    // PATCH customer's rating
    axios({
      url: `${API_URL}/vendors/${order.vendor}/orders/${order._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })

    .then((res) => {
      if (res.data){
        console.log("Submitted comment:")
        console.log(res.data)
      }
    })

    .catch((err) => {
      console.error(err)
    })

  }

  // Handle pop up notifications for cancel order
  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Handle pop up notifications for ratings
  const ratingSubmitted = () => {
    setRatingOpen((rating_open) => !rating_open)
  }

  const handleRatingClose = () => {
    setRatingOpen(false)
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

  // Get initial rating and comment
  useEffect(() => {
    console.log('getting rating')
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    axios(`${API_URL}/vendors/${order.vendor}/orders/${order._id}`, {
      headers,

    }).then((res) => {
      console.log(res.data.rating)
      setRating(res.data.rating)
      setComment(res.data.comment)
      if (res.data.comment){
        console.log(res.data.comment)
      }

    })
  }, [])


  // Get vendor's name
  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    axios(`${API_URL}/vendors/${order.vendor}`, {
      headers,
    }).then((res) => {
      console.log(res.data.van_name)
      setVendor(res.data.van_name)
    })
  }, [])

  // Get menu
  useEffect(() => {
    console.log('getting items')
    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])


  itemDict = dictify(menu) // make menu of snacks into a dictionary with ids as keys


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

            {Object.keys(itemDict).length !== 0 &&
              order.items &&
              Object.keys(order.items).length !== 0 && (

                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      {/*Mapping Items*/}
                      <TableBody>
                        {Object.keys(order.items).map((id, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              {itemDict[order.items[id]['item']]['item_name']}
                            </TableCell>
                            <TableCell>{order.items[id].quantity}</TableCell>
                            <TableCell>
                              {audFormatter.format(
                                order.items[id].quantity *
                                  itemDict[order.items[id]['item']][
                                    'item_price'
                                  ],
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" gutterBottom>
                              Total:{' '}
                              {audFormatter.format(
                                Object.keys(order.items)
                                  .map(
                                    (id) =>
                                      order.items[id].quantity *
                                      itemDict[order.items[id]['item']][
                                        'item_price'
                                      ],
                                  )
                                  .reduce((a, b) => a + b),
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                </>
              )}

            <Grid container style={{ justifyContent: 'space-around' }}>

            {/*Customer can only change or cancel order if order is unfulfilled AND it is within the time limit*/}
              {!order.fulfilled && checkModifyWindow(order.modified) ? (
                <Grid item>
                  <Button variant="outlined">
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      component={Link}
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

              {!order.fulfilled && checkModifyWindow(order.modified) ? (
                <Grid item>
                  <Button variant="outlined" onClick={handleCancelOrder}>
                    <Typography variant="button" display="block" gutterBottom>
                      Cancel Order
                    </Typography>
                  </Button>
                </Grid>
              ) : null}

              <Grid item></Grid>
            </Grid>
          </CardContent>
        )}

        {/*UI for customers to rate experience*/}
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Please take a moment to rate your experience!</Typography>
          <Rating
            name={"customer-rating" + order._id}
            precision={0.5}
            size="large"
            value={rating}
            onChange={(event, newRating) => {
              setRating(newRating);
              console.log(newRating)
              postRating(newRating);
            }}
          />

          {/*UI for customers to submit a comment*/}
          <form noValidate autoComplete="off" onSubmit={handle_comment_submit}>

            <Grid item style={{ marginTop: "1em" }}>
              <TextField
                name="comment"
                label="Comment"
                color="orange"
                defaultValue = {comment}
                variant= {comment ? "filled" : "outlined"}
                style ={{width: "70%"}}
              />
              </Grid>

              {/*Button to submit*/}
              <Button variant="contained"
              color="orange"
              style={{ marginTop: '1em' , marginBottom: '1em'}}
              disableElevation>
                Submit
              </Button>

          </form>

        </Box>


      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message="Order cancelled!"
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={rating_open}
        onClose={handleRatingClose}
        message="Thanks for reviewing!"
      />

      </ThemeProvider>
    </>
  )
}

export default OrderCard
