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

const columns = ['Item', 'Qty', 'Subtotal']

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const MyOrder = (props) => {
  const { order, setOrder } = props

  const handleCancelOrder = (e) => {
    e.preventDefault()
    setOrder({ items: {} })
    console.log('cleared order')
  }

  const handleConfirmOrder = (e) => {
    e.preventDefault()
    const headers = { 'Access-Control-Allow-Origin': '*' }
    // Requires a customer ID, so implement after authentication

    // axios
    //   .post(`${API_URL}/vendors/:vendor_id/orders`, {
    //     headers,
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  }

  return (
    <Container>
      <Typography variant="h2">My Order</Typography>
      {order.items && Object.keys(order.items).length !== 0 ? (
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
              <Button variant="outlined" onClick={handleConfirmOrder}>
                <Typography variant="button" display="block" gutterBottom>
                  Confirm Order
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="subtitle">
          Your order is empty! Try adding some items to your order.
        </Typography>
      )}
    </Container>
  )
}

export default MyOrder
