import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@material-ui/core'
import axios from 'axios'
import { API_URL } from '../../constants'
import { Link, Redirect, useHistory } from 'react-router-dom'

const columns = ['Item', 'Qty', 'Subtotal']

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const MyOrder = (props) => {
  const { order, setOrder, auth } = props

  const history = useHistory()

  const handleCancelOrder = (e) => {
    e.preventDefault()
    setOrder({ items: {}, confirmed: false })
    console.log('cleared order')
  }

  const handleConfirmOrder = (e) => {
    e.preventDefault()

    if (!auth) {
      console.log('please log in')
      // window.location.href = '/customer/login'
      history.push('/customer/login')
      return
    }

    setOrder({ ...order, confirmed: true })

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    const newItems = Object.keys(order.items).map((key) => ({
      ...order.items[key],
      item: key,
    }))

    const data = { items: newItems }

    axios
      .post(`${API_URL}/vendors/${order.vendor}/orders`, data, {
        headers,
      })
      .then((res) => {
        setOrder({ items: {}, confirmed: false })
        console.log('cleared order')
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <Container>
      <Typography variant="h2">My Order</Typography>
      {order && order.items && Object.keys(order.items).length !== 0 ? (
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
                    <TableCell>{order.items[id].item_name}</TableCell>
                    <TableCell>{order.items[id].quantity}</TableCell>
                    <TableCell>
                      {audFormatter.format(
                        order.items[id].quantity * order.items[id].item_price,
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
                              order.items[id].item_price,
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
          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item>
              <Button variant="outlined" onClick={handleCancelOrder}>
                <Typography variant="button" display="block" gutterBottom>
                  Cancel Order
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">
                <Button
                  component={Link}
                  to={`/customer/van/${order.vendor}`}
                  style={{ textDecoration: 'none' }}
                >
                  Edit Order Details
                </Button>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleConfirmOrder}>
                <Typography variant="button" display="block" gutterBottom>
                  Confirm Order
                </Typography>
              </Button>
              {order.confirmed ? <Redirect to="/customer/orders" /> : null}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography
            variant="subtitle"
            display="block"
            style={{ marginBottom: '2rem' }}
          >
            Your order is empty! Try finding a van to start ordering snacks.
          </Typography>

          <Button variant="outlined">
            <Button
              component={Link}
              to="/customer/orders"
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="button" display="block" gutterBottom>
                Order History
              </Typography>
            </Button>
          </Button>
        </>
      )}
    </Container>
  )
}

export default MyOrder
