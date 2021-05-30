import { Container, Grid, Typography } from '@material-ui/core'
import PastOrderCard from '../PastOrders/PastOrderCard'
import { dictify } from '../../HelperFunctions'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import jwt from 'jsonwebtoken'

// Vendor's Order History Page (Fulfilled and Picked Up)
const VendorPastOrders = (props) => {
  const [orders, setOrders] = useState(null)
  const [menu, setMenu] = useState(null)
  const { auth, setAuth } = props
  var itemDict = {}

  // Get menu (list of items with names and prices)
  useEffect(() => {
    console.log('getting items')

    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])

  if (menu) {
    // make menu of snacks into a dictionary with ids as keys
    itemDict = dictify(menu)
  }

  // Get all vendor's orders
  useEffect(() => {
    console.log('Getting vendor orders')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    }

    // If vendor is logged in
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

  // If vendor is not logged in
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

  // Show orders only if vendor is logged in
  return (
    <Container>
      <Typography variant="h2">Order History</Typography>
      {orders == null
        ? null
        : orders.length === 0
        ? 'You have no past orders!'
        : orders
            // Sort by newest orders first
            .sort((a, b) => -(new Date(a.modified) - new Date(b.modified)))
            .filter((order) => order.fulfilled && order.picked_up)
            .map((order, idx) => (
              <PastOrderCard
                key={idx}
                itemDict={itemDict}
                order={order}
                auth={auth}
                setAuth={setAuth}
              />
            ))}
    </Container>
  )
}

export default VendorPastOrders
