import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { Toolbar, IconButton, Grid } from '@material-ui/core'
import Logo from './Logo/Logo'

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useNavStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
  },
  appBar: {
    // background: 'in',
    boxShadow: '0px 0px 0px 0px',
  },
  tabs: {
    // float: 'right',
    marginLeft: 'none',
    height: '100%',
  },
}))

const Nav2 = () => {
  const classes = useNavStyles()
  //   const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="static"
          color="default"
          style={{
            boxShadow: '0px 0px 0px 0px',
            backgroundColor: '#fafafa',
            // position: 'absolute',
            // top: '10px',
            marginTop: '20px',
            marginBottom: '10px',
            width: '90%',
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={1.5}></Grid>
            <Grid item xs={5.5}>
              <Toolbar>
                <IconButton edge="start" aria-label="menu">
                  <Logo></Logo>
                </IconButton>
                <Typography variant="h4" fontWeight="bold">
                  SNACKS IN A VAN
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={5} style={{ height: '100%' }}>
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
                style={{ height: '100%', width: '100%' }}
              >
                <Tab
                  label="Find a van"
                  {...a11yProps(0)}
                  style={{ width: '80%' }}
                />
                <Tab
                  label="Log in / Sign Up"
                  {...a11yProps(1)}
                  style={{ width: '80%' }}
                />
                <Tab
                  label="My Order"
                  {...a11yProps(2)}
                  style={{ width: '80%' }}
                />
              </Tabs>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    </>
  )
}

export default Nav2
