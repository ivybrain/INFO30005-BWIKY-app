import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import OrderCard from '../Orders/OrderCard'
import jwt from 'jsonwebtoken'

const MyOrder = (props) => {
  const [orders, setOrders] = useState(null)

  const removeOrder = (id) => {
    let newOrders = JSON.parse(JSON.stringify(orders))
    setOrders(newOrders.filter((order) => order._id !== id))
  }

  // Get jwt token
  const { auth } = props
  console.log(auth)

  useEffect(() => {
    console.log('getting order history')
    const headers = { 'Access-Control-Allow-Origin': '*' }

    if (auth) {
      // Get customer id from jwt token
      const customerId = auth ? jwt.decode(auth)._id : null
      console.log('Customer id is %s', customerId)

      // Get all orders of specific customer (using customer id)
      axios(`${API_URL}/customers/${customerId}/orders`, {
        headers,
      }).then((res) => {
        setOrders(res.data)
      })
    } else {
      console.log("no auth yet, so let's wait until they're logged in")
    }
  }, [auth])

  if (!auth) {
    return (
      <Container>
        <Typography variant="h2">My Orders</Typography>
        <Typography variant="subtitle">
          Please log in before viewing your orders!
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h2">My Orders</Typography>
      {orders == null
        ? null
        : orders.length === 0
        ? 'You have no current or past orders!'
        : orders
            .sort((a, b) => -(new Date(a.modified) - new Date(b.modified)))
            .map((order) => (
              <OrderCard order={order} auth={auth} removeOrder={removeOrder} />
            ))}
    </Container>
  )
}

export default MyOrder
