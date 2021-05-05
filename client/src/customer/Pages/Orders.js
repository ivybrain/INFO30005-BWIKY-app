import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import OrderCard from '../Orders/OrderCard'

const MyOrder = (props) => {
  const [orders, setOrders] = useState(null)
  const customerId = '60921b0f82816b6063aef6fa' // dummy customer ID

  useEffect(() => {
    console.log('getting order history')
    const headers = { 'Access-Control-Allow-Origin': '*' }

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
        : orders.map((order) => <OrderCard order={order}></OrderCard>)}
    </Container>
  )
}

export default MyOrder
