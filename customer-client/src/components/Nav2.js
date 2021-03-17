import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Toolbar, IconButton, Grid } from '@material-ui/core'
import Logo from './Logo/Logo'
import theme from '../theme'

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useNavStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  appBar: {
    // background: theme.white,
    boxShadow: '0px 0px 0px 0px',
  },
  tabs: {
    // float: 'right',
    marginLeft: 'none',
    height: '100%',
  },
}))

export default function Nav2() {
  const classes = useNavStyles()
  //   const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        style={{ boxShadow: '0px 0px 0px 0px' }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Toolbar>
              <IconButton edge="start" aria-label="menu">
                <Logo></Logo>
              </IconButton>
              <Typography variant="h6">SNACKS IN A VAN</Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={4} style={{ height: '100%' }}>
            {/* <div style={{}}>Snacks</div> */}
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              // variant="fullWidth"
              aria-label="navigation tabs"
              //   flexContainer
              className={classes.tabs}
              style={{ height: '100%' }}
            >
              <Tab label="Find a van" {...a11yProps(0)} />
              <Tab label="Log in / Sign Up" {...a11yProps(1)} />
              <Tab label="My Order" {...a11yProps(2)} />
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  )
}
