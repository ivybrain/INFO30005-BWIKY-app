import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import Order from '../OrderHistory/Order'

const MyOrder = (props) => {
  const [orderHistory, setOrderHistory] = useState([
    { items: [{ x: { quantity: 10, item_name: 'item 1' } }] },
    { items: [{ y: { quantity: 2, item_name: 'item 3' } }] },
  ])
  useEffect(() => {
    // axios(`${API_URL}/orders`, {
    //   headers,
    // })
    //   .then((res) => {
    //     let data = res.data
    //     data.distance = 10
    //     setVanData(data)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  })
  return (
    <Container>
      <Typography variant="h2">My Orders</Typography>
      {orderHistory.map((order) => (
        <Order order={order}></Order>
      ))}
    </Container>
  )
}

export default MyOrder
