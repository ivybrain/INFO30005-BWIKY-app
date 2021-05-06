import { useState } from 'react'
import { CssBaseline } from '@material-ui/core'
// import Nav from './customer/Nav'
// import Nav2 from './customer/Nav2'
import Nav3 from './customer/Nav3'
import { Switch, Route } from 'react-router-dom'
import SplashPage from './customer/Pages/SplashPage'
import Login from './customer/Pages/Login'
import MyOrder from './customer/Pages/MyOrder'
import VanDetails from './customer/Pages/VanDetails'
import Orders from './customer/Pages/Orders'

const CustomerApp = () => {
  const [location, setLocation] = useState(null)
  const [vans, setVans] = useState(null)
  const [menu, setMenu] = useState(null)
  const [order, setOrder] = useState({ items: {}, confirmed: false })
  const [auth, setAuth] = useState(null)

  return (
    <div className="App">
      <CssBaseline />
      {/* <Nav></Nav> */}
      {/* <Nav2></Nav2> */}
      <Nav3 order={order} auth={auth}></Nav3>
      <Switch>
        <Route
          exact
          path="/customer/"
          render={() => (
            <SplashPage
              location={location}
              setLocation={setLocation}
              vans={vans}
              setVans={setVans}
            />
          )}
        />
        <Route
          exact
          path="/customer/login"
          render={() => <Login setAuth={setAuth} />}
        />
        <Route
          exact
          path="/customer/myorder"
          render={() => (
            <MyOrder auth={auth} order={order} setOrder={setOrder} />
          )}
        />
        <Route
          exact
          path="/customer/orders"
          render={() => <Orders order={order} setOrder={setOrder} />}
        />
        <Route
          exact
          path="/customer/van/:id"
          render={(props) => (
            <VanDetails
              {...props}
              vans={vans}
              menu={menu}
              setMenu={setMenu}
              order={order}
              setOrder={setOrder}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default CustomerApp
