import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import Logo from "./Logo/Logo";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <Grid container direction="row" justify="center">
      <Container
        maxWidth="sm"
        style={{
          // margin: "0",
          position: "absolute",
          top: "25%",
        }}
      >
        <Grid container direction="column" justify="center" spacing={3}>
          <Grid item>
            <Grid
              container
              direction="row"
              spacing={0}
              justify="center"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                height: "50px",
              }}
            >
              <Grid item xs={1}>
                <Logo></Logo>
              </Grid>
              <Grid item fontWeight="fontWeightBold">
                <Typography variant="h4">SNACKS IN A VAN</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ margin: "auto" }}>
            <TextField variant="outlined" label="Van Name"></TextField>
          </Grid>
          <Grid item style={{ margin: "auto" }}>
            <TextField variant="outlined" label="Password"></TextField>
          </Grid>
          <Grid item style={{ margin: "auto" }}>
            <Button variant="contained">
              <Link to="/checkin">Log In</Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default LoginScreen;
