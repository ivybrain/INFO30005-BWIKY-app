import { CssBaseline } from "@material-ui/core";

import { Switch, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import Checkin from "./components/Checkin/Checkin";
import Order from "./components/Order/Order";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/checkin" component={Checkin} />
        <Route exact path="/orders" component={Orders} />
        <Route
          path="/orders/:id"
          render={(props) => <Order {...props}></Order>}
        />
        <Route exact path="/" component={LoginScreen} />
      </Switch>
    </div>
  );
}

export default App;
