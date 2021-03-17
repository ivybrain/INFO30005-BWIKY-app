import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Nav = (props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Snacks in a Van!</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Nav
