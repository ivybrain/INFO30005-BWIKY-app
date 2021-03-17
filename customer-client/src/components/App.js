import * as React from 'react'
import { Container, CssBaseline } from '@material-ui/core'
// import Nav from './Nav'
import Nav2 from './Nav2'
import NearestVans from './NearestVans/NearestVans'
import PageHandler from './PageHandler'

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      {/* <Nav></Nav> */}
      <Nav2></Nav2>
    </div>
  )
}

export default App
