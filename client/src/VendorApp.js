import { Switch, Route } from 'react-router-dom'
import LoginScreen from './vendor/LoginScreen'
import Checkin from './vendor/Checkin/Checkin'
import Order from './vendor/Order/Order'
import Orders from './vendor/Orders/Orders'
import OrderHistory from './vendor/History/OrderHistory'

function VendorApp() {
  return (
    <div>
      <Switch>
        <Route exact path="/vendor/checkin" component={Checkin} />
        <Route exact path="/vendor/orders" component={Orders} />
        <Route
          path="/vendor/orders/:id"
          render={(props) => <Order {...props}></Order>}
        />
        <Route exact path="/vendor/history" component={OrderHistory} />
        <Route exact path="/vendor/" component={LoginScreen} />
      </Switch>
    </div>
  )
}

export default VendorApp
