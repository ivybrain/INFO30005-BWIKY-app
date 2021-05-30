import { Container, Grid , Typography} from "@material-ui/core";
import OrderCard from "../Orders/VendorOrderCard";
import FulfilledOrderCard from '../Orders/FulfilledOrderCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { API_URL } from '../../constants'
import { dictify } from '../../HelperFunctions'

// Vendor's page which displays all orders which are ongoing and awaiting pick up
const VendorOrders = (props) => {
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

  if (menu){
    // make menu of snacks into a dictionary with ids as keys
    itemDict = dictify(menu)
  }

  // Get orders
  useEffect(() => {
    console.log('Getting vendor orders')

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`,
    }

    // Update orders every 800 ms
    const interval = setInterval(() => {

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
    }, 800);
    return () => clearInterval(interval);

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


  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
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
              Outstanding Orders
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
                        <OrderCard itemDict={itemDict} order={order} auth={auth} setAuth={setAuth} />
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
                      <FulfilledOrderCard itemDict={itemDict} order={order} auth={auth} setAuth={setAuth} />
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
