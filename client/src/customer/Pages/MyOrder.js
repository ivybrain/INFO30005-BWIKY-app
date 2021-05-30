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
  Grid
} from '@material-ui/core'
import axios from 'axios'
import { API_URL } from '../../constants'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useState } from 'react'

const columns = ['Item', 'Qty', 'Subtotal']

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})


// Shopping Cart Page where customer reviews and confirms current order
const MyOrder = (props) => {
  const { order, setOrder, auth } = props
  const history = useHistory()


  // If customer cancels order
  const handleCancelOrder = (e) => {
    e.preventDefault()

    // Clear order (items are empty)
    setOrder({ items: {}, confirmed: false })
    console.log('cleared order')

  }


  // If customer confirms order
  const handleConfirmOrder = (e) => {
    e.preventDefault()

    // If customer has not logged in
    if (!auth) {
      console.log('please log in')
      history.push('/customer/login') // direct to login page
      return
    }

    // Store order
    setOrder({ ...order, confirmed: true })

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    // POST order to database so it appears on vendor's end
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

    {/*If order exists, display table with item names, quantity and price*/}
      <Typography variant="h2">My Order</Typography>
      {order && order.items && Object.keys(order.items).length !== 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
              {/*Render columns*/}
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/*Render item names and quantities*/}
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
                  {/*Format price*/}
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

          {/*Cancel Button*/}
            <Grid item>
              <Button variant="outlined" style={{ marginTop: '0.5rem' }}
                color="orange" onClick={handleCancelOrder}>
                <Button color="orange" variant="button" display="block" gutterBottom>
                  Cancel Order
                </Button>
              </Button>
            </Grid>

            {/*Edit Order Button, redirects customer back to van's menu*/}
            <Grid item>
              <Button variant="outlined" style={{ marginTop: '0.5rem' }} color="orange">
                <Button
                  color="orange"
                  display="block"
                  component={Link}
                  to={`/customer/van/${order.vendor}`}
                  style={{ textDecoration: 'none' }}
                  gutterBottom
                >
                  Edit Order Details
                </Button>
              </Button>
            </Grid>

            {/*Confirm Order Button*/}
            <Grid item>
              <Button color="orange" style={{ marginTop: '0.5rem' }} variant="outlined" onClick={handleConfirmOrder}>
                <Button color="orange" variant="button" display="block" gutterBottom>
                  Confirm Order
                </Button>
              </Button>
              {order.confirmed ? <Redirect to="/customer/orders" /> : null}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
        {/*If there is no order yet*/}

          <Typography
            variant="subtitle"
            display="block"
            style={{ marginBottom: '2rem' }}
          >
            Your order is empty! Try finding a van to start ordering snacks.
          </Typography>

          {/*Order History Button, redirects to page with all previous orders*/}
          <Button variant="outlined" color = "orange">
            <Button
              color = "orange"
              component={Link}
              to="/customer/orders"
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="button" display="block">
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
