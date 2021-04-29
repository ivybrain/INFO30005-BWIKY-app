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

const MyOrder = (props) => {
  const { order } = props

  const rows = order.items
  return (
    <Container>
      <Typography variant="h2">My Order</Typography>
      {order !== {} ? (
        ''
      ) : (
        <Typography variant="subtitle">Your order is empty!</Typography>
      )}

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
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.item_name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                {/* <TableCell>{row.price}</TableCell> */}
                <TableCell>{6.34}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default MyOrder
