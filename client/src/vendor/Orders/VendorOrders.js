import { Container, Grid , Typography} from "@material-ui/core";
import Header from "../Header";
import OrderCard from "./VendorOrderCard";
import FulfilledOrderCard from './FulfilledOrderCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'



const VendorOrders = (props) => {
  const [orders, setOrders] = useState(null)

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
      // Get customer id from jwt token
      const customerId = auth ? jwt.decode(auth)._id : null
      console.log(auth)
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
        <Typography variant="h2">Order List</Typography>
        <Typography variant="subtitle">
          Please log in before viewing your orders!
        </Typography>
      </Container>
    )
  }
  */


  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <Container>
        <h1>Order List</h1>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={8}>
            <Typography variant="h6" style={{ marginTop: "1em",marginBottom: "1em", marginLeft: "1em" }}>
              Unfulfilled Orders
            </Typography>
            {/*Only display unfulfilled (ongoing) orders. Sort by older orders first*/}
            {orders == null
              ? null
              : orders.length === 0
              ? 'You have no current or past orders!'
              : orders
                  .sort((a, b) => -(new Date(b.modified) - new Date(a.modified)))
                  .filter(order => !order.fulfilled)
                  .map((order) => (
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <OrderCard order={order} />
                      </Grid>
                    </Grid>

                  ))}

          </Grid>

          <Grid item xs={4}>

          <Typography variant="h6" style={{ marginTop: "1em", marginBottom: "1em", arginLeft: "1em" }}>
            Orders Awaiting Pick Up
          </Typography>

          {/*Only display unfulfilled (ongoing) orders. Sort by older orders first*/}
          {orders == null
            ? null
            : orders.length === 0
            ? 'You have no current or past orders!'
            : orders
                .sort((a, b) => -(new Date(b.modified) - new Date(a.modified)))
                .filter(order => order.fulfilled && !order.picked_up)
                .map((order) => (
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <FulfilledOrderCard order={order} />
                    </Grid>
                  </Grid>

                ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default VendorOrders;
