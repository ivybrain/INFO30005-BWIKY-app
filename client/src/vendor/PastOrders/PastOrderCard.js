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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useEffect, useState } from 'react'
import axios from 'axios'

import { API_URL } from '../../constants'
import {dictify,
  formatTime,
  checkDiscount,
  formatDateTime
} from '../../HelperFunctions'


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


// Fulfilled and Picked Up Orders for Vendor
const PastOrderCard = (props) => {
  const { order , auth, setAuth } = props
  const [customer, setCustomer] = useState('')
  const [menu, setMenu] = useState(null)
  const [open, setOpen] = useState(false)
  var customer_name = ""

  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  var itemDict = {}

  const classes = useStyles()

  useEffect(() => {
    console.log('Getting Customer')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    axios(`${API_URL}/customers/${order.customer}`, {
        headers,
    }).then((res) => {
        setCustomer(res.data)
    })
    // Invalid Customer
    .catch((err) => {
        console.error(err)
        console.log("Invalid customer")
    })
  }, [])

  useEffect(() => {
    console.log('getting items')
    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])

  itemDict = dictify(menu)

  if (customer){
    customer_name = customer.given_name + " " + customer.family_name
  }

  return (
    <>
      <Card
        className={classes.root}
        variant="outlined"
        style={{ marginTop: '20px' }}
      >
        {itemDict.length !== 0 && (
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
              Ordered by {customer_name}{' '}
              {order.modified ? `on ${formatDateTime(order.modified)}` : null}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Discount {' '}
              {checkDiscount(order) ? "20" : "0"}% applied
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Fulfilled at {' '}
              {order.fulfilled ? `${formatTime(order.fulfilled_time)}` : null}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Picked Up {checkmark}
            </Typography>

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
          </CardContent>
        )}
      </Card>
    </>
  )
}

export default PastOrderCard
