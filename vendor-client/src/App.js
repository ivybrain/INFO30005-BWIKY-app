import { CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import Checkin from "./components/Checkin/Checkin";
import Order from "./components/Order/Order";

function App() {
  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/checkin" component={Checkin} />
        <Route
          path="/order/:id"
          render={(props) => <Order {...props}></Order>}
        />
        <Route exact path="/" component={LoginScreen} />
      </Switch>
    </div>
  );
}

export default App;
