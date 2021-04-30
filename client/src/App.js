import { CssBaseline } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import VendorApp from './VendorApp'
import CustomerApp from './CustomerApp'

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Switch>
        <Route path="/vendor" component={VendorApp} />
        <Route path="/customer" component={CustomerApp} />
      </Switch>
    </div>
  )
}

export default App
