import { createMuiTheme } from '@material-ui/core/styles'

// Material UI theme 
const theme = createMuiTheme({
  palette: {
    orange: {
      main: '#F27D52',
      contrastText: '#ffffff',
    },
    beige: {
      main: '#EDCC99',
    },
    green: {
      main: '#77DDAB',
      contrastText: '#ffffff',
    },
    brown: {
      main: '#776533',
      contrastText: '#ffffff',
    },
    grey: {
      main: '#959595',
    },
    white: {
      main: '#FFFFFF',
    },
  },
})

export default theme
