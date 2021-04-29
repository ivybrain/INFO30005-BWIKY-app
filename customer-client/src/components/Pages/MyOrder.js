import { Container, Typography } from '@material-ui/core'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
            {rows.map((row) => (
              <TableRow key={row.item}>
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
