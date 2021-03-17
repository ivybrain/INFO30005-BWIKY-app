import * as React from 'react'
import { Container } from '@material-ui/core'
import Nav from './Nav'
import NearestVans from './NearestVans/NearestVans'

const App = () => {
  return (
    <div className="App">
      <Nav></Nav>
      <Container>
        <NearestVans></NearestVans>
      </Container>
    </div>
  )
}

export default App
