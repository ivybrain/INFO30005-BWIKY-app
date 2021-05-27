import { Container, Grid, Typography } from '@material-ui/core'
import PastOrderCard from "../PastOrders/PastOrderCard";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'



const VendorPastOrders = (props) => {
  const [orders, setOrders] = useState(null)

  // Get jwt token
  //const { auth } = props
  const vendor_id = '607710190959c969a0325848' // Dummy customer data (to be replaced with proper auth)

  useEffect(() => {
    console.log('Getting vendor orders')
    const headers = { 'Access-Control-Allow-Origin': '*' }

    // Get all current and previous orders of specific vendor (using vendor id)
    axios(`${API_URL}/vendors/${vendor_id}/orders`, {
      headers,
    }).then((res) => {
      setOrders(res.data)
    })
  })

  // Get jwt token
  //const { auth } = props

  /*
  useEffect(() => {
    console.log('Getting vendor orders')
    const headers = { 'Access-Control-Allow-Origin': '*' }


    if (auth) {
      // Get vendor id from jwt token
      const vendor_id = auth ? jwt.decode(auth)._id : null
      console.log(auth)
      console.log('Vendor id is %s', vendor_id)

      // Get all orders of specific customer (using customer id)
      axios(`${API_URL}/vendors/${vendor_id}/orders`, {
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
        <Typography variant="h2">Order List</Typography>
        <Typography variant="subtitle">
          Please log in before viewing your orders!
        </Typography>
      </Container>
    )
  }
  */

  return (
    <Container>
      <Typography variant="h2">Order History</Typography>
      {orders == null
        ? null
        : orders.length === 0
        ? 'You have no past orders!'
        : orders
            .sort((a, b) => -(new Date(a.modified) - new Date(b.modified)))
            .filter(order => order.fulfilled && order.picked_up)
            .map((order) => (
              <PastOrderCard order={order} />
            ))}
    </Container>
  )
}

export default VendorPastOrders
