import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

// Formatter for turning numbers into currency formats
const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const OrderCardTable = (props) => {
  const { itemDict, order } = props

  const columns = ['Item', 'Qty', 'Subtotal']

  return (
    <>
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
                                itemDict[order.items[id]['item']]['item_price'],
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
    </>
  )
}

export default OrderCardTable
