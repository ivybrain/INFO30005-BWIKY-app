import { useEffect, useState } from 'react'
import { CssBaseline } from '@material-ui/core'
// import Nav from './components/Nav'
// import Nav2 from './components/Nav2'
import Nav3 from './components/Nav3'
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/Pages/SplashPage'
import Login from './components/Pages/Login'
import MyOrder from './components/Pages/MyOrder'

const App = () => {
  const [location, setLocation] = useState(null)

  return (
    <div className="App">
      <CssBaseline />
      {/* <Nav></Nav> */}
      {/* <Nav2></Nav2> */}
      <Nav3></Nav3>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <SplashPage location={location} setLocation={setLocation} />
          )}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/myorder" component={MyOrder} />
        {/*
        <Route
          path="/orders/:id"
          render={(props) => <Order {...props}></Order>}
        />*/}
      </Switch>
    </div>
  )
}

export default App
