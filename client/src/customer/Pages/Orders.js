import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import OrderCard from '../Orders/OrderCard'
import jwt from 'jsonwebtoken'
import { dictify } from '../../HelperFunctions'


// Order History Page which displays customer's all previous orders
// Allows customer to modify or cancel most recent orders within time limit
const Orders = (props) => {
  const [orders, setOrders] = useState(null)
  const [menu, setMenu] = useState(null)
  const { auth } = props // Get authentification token
  var itemDict = {} // Initialise menu dictionary


  // Function to be passed into OrderCard to handle cancelled orders
  const removeOrder = (id) => {
    let newOrders = JSON.parse(JSON.stringify(orders))
    setOrders(newOrders.filter((order) => order._id !== id))
  }

  // Get menu (list of items with names and prices)
  useEffect(() => {
    console.log('getting items')
    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])


  // Get list of orders for customer
  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    // Update orders every second
    const interval = setInterval(() => {

      if (auth) {
        // Get customer id from jwt token
        const customer_id = auth ? jwt.decode(auth)._id : null

        // Get all orders of specific customer (using customer id)
        axios(`${API_URL}/customers/${customer_id}/orders`, {
          headers,
        }).then((res) => {
          setOrders(res.data)
        })
      } else {
        console.log("no auth yet, so let's wait until they're logged in")
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [auth])


  // If customer is not logged in
  if (!auth) {
    // Render :
    return (
      <Container>
        <Typography variant="h2">My Orders</Typography>
        <Typography variant="subtitle">
          Please log in before viewing your orders!
        </Typography>
      </Container>
    )
  }

  if (menu){
    // make menu of snacks into a dictionary with ids as keys
    itemDict = dictify(menu)
  }


  // If customer is logged in
  return (
    <Container>
      <Typography variant="h2">My Orders</Typography>
      {/* Show all previous orders*/}

      {orders == null
        ? null
        : orders.length === 0
        ? 'You have no current or past orders!'
        : orders
            .sort((a, b) => -(new Date(a.modified) - new Date(b.modified)))
            .map((order) => (
              <OrderCard order={order} auth={auth} removeOrder={removeOrder} itemDict={itemDict}/>
            ))}
    </Container>
  )
}

export default Orders
