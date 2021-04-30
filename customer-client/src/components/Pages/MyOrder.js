import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const columns = ['Item', 'Qty', 'Subtotal']

var audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const MyOrder = (props) => {
  const { order } = props

  return (
    <Container>
      <Typography variant="h2">My Order</Typography>
      {order.items && Object.keys(order.items).length !== 0 ? (
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
      ) : (
        <Typography variant="subtitle">
          Your order is empty! Try adding some items to your order.
        </Typography>
      )}
    </Container>
  )
}

export default MyOrder
