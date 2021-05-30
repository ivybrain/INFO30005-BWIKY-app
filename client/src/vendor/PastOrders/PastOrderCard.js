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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL, useConfig } from '../../constants'
import {
  formatTime,
  checkDiscount,
  formatDateTime,
} from '../../HelperFunctions'

const columns = ['Item', 'Qty', 'Subtotal']
const checkmark = '\uD83D\uDDF9'

// Formatter to display prices as AUD
const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

// Style sheet
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
  const { order, auth, setAuth, itemDict } = props
  const [customer, setCustomer] = useState('')
  const classes = useStyles()
  var customer_name = ''
  const { loading, config } = useConfig()

  // Get customer's name for the order
  useEffect(() => {
    console.log('Getting Customer')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    axios(`${API_URL}/customers/${order.customer}`, {
      headers,
    })
      .then((res) => {
        setCustomer(res.data)
      })
      // Invalid Customer
      .catch((err) => {
        console.error(err)
        console.log('Invalid customer')
      })
  }, [])

  // Format customer name
  if (customer) {
    customer_name = customer.given_name + ' ' + customer.family_name
  }

  return (
    <>
      <Card
        className={classes.root}
        variant="outlined"
        style={{ marginTop: '20px' }}
      >
        {/* If item dictionary is defined*/}
        {itemDict.length !== 0 && (
          <CardContent>
            {/*Display order number*/}
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

            {/*Display customer name, date and time order was placed*/}
            <Typography variant="body2" color="textSecondary" component="p">
              Ordered by {customer_name}{' '}
              {order.modified ? `on ${formatDateTime(order.modified)}` : null}
            </Typography>

            {!loading ? (
              <Typography variant="body2" color="textSecondary" component="p">
                Discount{' '}
                {checkDiscount(order, config.discount_time)
                  ? config.discount_value
                  : 0}
                % applied
              </Typography>
            ) : null}

            {/*Display date and time order was fulfilled*/}
            <Typography variant="body2" color="textSecondary" component="p">
              Fulfilled at{' '}
              {order.fulfilled ? `${formatTime(order.fulfilled_time)}` : null}
            </Typography>

            {/*Display picked up status*/}
            <Typography variant="body2" color="textSecondary" component="p">
              Picked Up {checkmark}
            </Typography>

            {/*If item dictionary is defined and order has items*/}
            {Object.keys(itemDict).length !== 0 &&
              order.items &&
              Object.keys(order.items).length !== 0 && (
                <>
                  <TableContainer>
                    <Table>
                      {/*Mapping column names*/}
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      {/*Mapping item names, quantities and prices to table*/}
                      <TableBody>
                        {Object.keys(order.items).map((id, idx) => (
                          <TableRow key={idx}>
                            {/*Mapping item names by referring to dictionary*/}
                            <TableCell>
                              {itemDict[order.items[id]['item']]['item_name']}
                            </TableCell>

                            {/*Mapping item quantities in order*/}
                            <TableCell>{order.items[id].quantity}</TableCell>

                            {/*Calculate and map item prices*/}
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

                          {/*Calculate and display total price of order*/}
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
