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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import { makeStyles } from '@material-ui/core/styles'

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

function dictify(list) {
  var out = {}
  if (list) {
    list.forEach((x) => (out[x._id] = x))
  }
  return out
}

const OrderCard = (props) => {
  const { order } = props
  const [vendor, setVendor] = useState('')
  const [menu, setMenu] = useState(null)
  var itemDict = {}

  const classes = useStyles()

  useEffect(() => {
    console.log('getting vendor')
    const headers = { 'Access-Control-Allow-Origin': '*' }

    axios(`${API_URL}/vendors/${order.vendor}`, {
      headers,
    }).then((res) => {
      console.log(res.data.van_name)
      setVendor(res.data.van_name)
    })
  }, [])

  useEffect(() => {
    console.log('getting items')
    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])

  itemDict = dictify(menu)
  console.log(itemDict)
  console.log(Object.keys(itemDict).length)

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ marginTop: '20px' }}
    >
      {itemDict.length !== 0 && (
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" display="inline">
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
            {order.modified ? `on ${order.modified.slice(0, 10)}` : null}
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
                                itemDict[order.items[id]['item']]['item_price'],
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

          {order.fulfilled ? (
            <>
              <tr
                style={{ fontFamily: 'Roboto', fontSize: 14, color: 'green' }}
              >
                <td>Fulfilled {checkmark}</td>
              </tr>
            </>
          ) : (
            <tr style={{ fontFamily: 'Roboto', fontSize: 14, color: 'grey' }}>
              <td>Fulfilled {emptyBox}</td>
            </tr>
          )}

          {order.picked_up ? (
            <>
              <tr
                style={{ fontFamily: 'Roboto', fontSize: 14, color: 'green' }}
              >
                <td>Picked Up {checkmark}</td>
              </tr>
            </>
          ) : (
            <tr style={{ fontFamily: 'Roboto', fontSize: 14, color: 'grey' }}>
              <td>Picked Up {emptyBox}</td>
            </tr>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default OrderCard
