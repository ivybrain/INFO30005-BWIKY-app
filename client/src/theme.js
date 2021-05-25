import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: purple[50],
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  // },
  palette:{
    orange: {
      main: '#F27D52',
      contrastText: '#ffffff'
    },
    beige: {
      main: '#EDCC99',
    },
    green: {
      main: '#77DDAB',
    },
    brown: {
      main: '#776533',
    },
    grey: {
      main: '#959595',
    },
    white: {
      main: '#FFFFFF',
    },
  }
  
});

export default theme