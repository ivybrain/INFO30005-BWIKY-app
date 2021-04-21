import { CssBaseline } from "@material-ui/core";
import LoginScreen from "./components/LoginScreen";
import Checkin from "./components/Checkin/Checkin";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/checkin" component={Checkin} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
