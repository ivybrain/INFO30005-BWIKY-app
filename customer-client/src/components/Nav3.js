import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
  text: {
    color: 'black',
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: 'white', color: 'white' }}
      xs={2}
    >
      <AppBar
        position="static"
        className={classes.appBar}
        style={{ backgroundColor: '#fafafa', boxShadow: 'none' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ marginLeft: '10vw' }}
          >
            Snacks in a Van!
          </Typography>
          <Link to="/">
            <Button className={classes.text}>Find a Van</Button>
          </Link>
          <Link to="/login">
            <Button className={classes.text}>Login</Button>
          </Link>
          <Link to="/myorder" style={{ marginRight: '10vw' }}>
            <Button className={classes.text}>My Order</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
