import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import OrderCard from '../Orders/OrderCard'
import jwt from 'jsonwebtoken'


const MyOrder = (props) => {
  const [orders, setOrders] = useState(null)

  // Get jwt token
  const { auth } = props
  console.log(auth)

  // Get customer id from jwt token
  const customerId = jwt.decode(auth)._id
  console.log('Customer id is %s', customerId)

  useEffect(() => {
    console.log('getting order history')
    const headers = { 'Access-Control-Allow-Origin': '*' }

    // Get all orders of specific customer (using customer id)
    axios(`${API_URL}/customers/${customerId}/orders`, {
      headers,
    }).then((res) => {
      setOrders(res.data)
    })
  }, [])

  return (
    <Container>
      <Typography variant="h2">My Orders</Typography>
      {orders == null
        ? ''
        : orders
            .sort((a, b) => -(new Date(a.modified) - new Date(b.modified)))
            .map((order) => <OrderCard order={order}></OrderCard>)}
    </Container>
  )
}

export default MyOrder
