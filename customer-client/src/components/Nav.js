import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import Logo from './Logo/Logo'

const Nav = (props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // color="inherit"
            aria-label="menu"
          >
            <Logo></Logo>
          </IconButton>
          <Typography variant="h6">Snacks in a Van!</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Nav
