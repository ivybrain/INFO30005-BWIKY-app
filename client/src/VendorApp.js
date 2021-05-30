import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import LoginScreen from './vendor/Pages/LoginScreen'
import Checkin from './vendor/Pages/Checkin'
import VendorOrders from './vendor/Pages/VendorOrders'
import VendorPastOrders from "./vendor/Pages/VendorPastOrders"
import NavBar from "./vendor/Nav"


// Main Vendor Client function
function VendorApp() {
  const [auth, setAuth] = useState(null)

  return (
    <div>
      <CssBaseline />

      {/* Navigation bar */}
      <NavBar auth={auth} setAuth = {setAuth}></NavBar>

      <Switch>
        {/* Vendor login page */}
        <Route
          exact path="/vendor/"
          render={(props) => <LoginScreen auth={auth} setAuth = {setAuth}></LoginScreen>}
        />

        {/* Location check in page */}
        <Route
          exact path="/vendor/checkin"
          render={(props) => <Checkin auth={auth} setAuth = {setAuth}></Checkin>}
        />

        {/* Current orders page */}
        <Route
          exact path="/vendor/orders"
          render={(props) => (
            <VendorOrders {...props} auth={auth} setAuth = {setAuth}></VendorOrders>
          )}
        />

        {/* Past orders page */}
        <Route
          exact path="/vendor/history"
          render={(props) => <VendorPastOrders auth={auth} setAuth = {setAuth}></VendorPastOrders>
          }
        />


      </Switch>
    </div>
  )
}

export default VendorApp
