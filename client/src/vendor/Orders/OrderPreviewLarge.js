import {
  Paper,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Checkbox,
  Container,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const StyledTableCell = withStyles((theme) => ({
  //   head: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  body: {
    fontSize: 12,
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    // height: "50%",
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow)

const StyledPaper = withStyles((theme) => ({
  root: {
    paper: {
      borderColor: '#92c949',
      paddingBottom: '100',
      backgroundColor: 'green',
    },
  },
}))(Paper)

const OrderPreviewLarge = (props) => {
  const columns = ['Item', 'Qty', 'Status']

  const rows = [
    {
      item: 'Small cake',
      quantity: 2,
      status: false,
    },
    {
      item: 'Cappuccino',
      quantity: 1,
      status: false,
    },
  ]

  return (
    <StyledPaper variant="outlined" borderColor="primary.main">
      <Paper
        component={Link}
        to={'/vendor/orders/100'}
        style={{ textDecoration: 'none' }}
      >
        <Container>
          <Typography variant="h4">Order #{props.orderNumber}</Typography>

          <TableContainer style={{ width: '60%' }}>
            <TableContainer>
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell>{column}</StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.item}>
                    <StyledTableCell>{row.item}</StyledTableCell>
                    <StyledTableCell>{row.quantity}</StyledTableCell>
                    <StyledTableCell>
                      <Checkbox checked={row.status} color="primary"></Checkbox>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>
        </Container>
      </Paper>
    </StyledPaper>
  )
}

export default OrderPreviewLarge
