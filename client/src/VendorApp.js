import { Switch, Route } from 'react-router-dom'
import LoginScreen from './vendor/LoginScreen'
import Checkin from './vendor/Checkin/Checkin'
import Order from './vendor/Order/Order'
import VendorOrders from './vendor/Orders/VendorOrders'
import OrderHistory from './vendor/History/OrderHistory'
import OrderCard from './vendor/Orders/VendorOrderCard'
import FulfilledOrderCard from './vendor/Orders/FulfilledOrderCard'


function VendorApp() {
  return (
    <div>
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
