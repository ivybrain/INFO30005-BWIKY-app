import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import LoginScreen from './vendor/Pages/LoginScreen'
import Checkin from './vendor/Pages/Checkin'
import VendorOrders from './vendor/Pages/VendorOrders'
import OrderCard from './vendor/Orders/VendorOrderCard'
import FulfilledOrderCard from './vendor/Orders/FulfilledOrderCard'
import PastOrderCard from "./vendor/PastOrders/PastOrderCard"
import VendorPastOrders from "./vendor/Pages/VendorPastOrders"
import NavBar from "./vendor/Nav"

function VendorApp() {
  const [auth, setAuth] = useState(null)

  return (
    <div>
      <CssBaseline />

      <NavBar auth={auth} setAuth = {setAuth}></NavBar>

      <Route
        exact path="/vendor/"
        component={LoginScreen}
        render={(props) => <Checkin auth={auth}></Checkin>}
      />

      <Switch>
        <Route exact path="/vendor/checkin" component={Checkin} />

        <Route
          exact path="/vendor/orders"
          component={VendorOrders}
          render={(props) => <OrderCard {...props}></OrderCard>
          }
        />

        <Route
          exact path="/vendor/orders"
          component={VendorOrders}
          render={(props) => <FulfilledOrderCard {...props}></FulfilledOrderCard>
          }
        />

        <Route
          exact path="/vendor/history"
          component={VendorPastOrders}
          render={(props) => <PastOrderCard {...props}></PastOrderCard>
          }
        />


      </Switch>
    </div>
  )
}

export default VendorApp
