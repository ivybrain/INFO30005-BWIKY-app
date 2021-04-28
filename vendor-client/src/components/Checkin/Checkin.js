import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../Header";

const Checkin = () => {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <Container style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={3}
          style={{ margin: "auto" }}
        >
          <Grid item style={{ margin: "auto", width: "50%" }} xs={4}>
            <TextField
              variant="outlined"
              style={{ width: "100%" }}
              label="enter your current location to check in"
            />
          </Grid>

          <Grid item style={{ margin: "auto" }}>
            <Typography variant="h6">
              Past locations on this account:
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          style={{ margin: "auto", width: "60%", marginBottom: "10px" }}
        >
          <Paper
            variant="outlined"
            style={{ width: "50%", margin: "auto", height: "8vh" }}
          >
            <Typography variant="h6" style={{ margin: "auto" }}>
              Off Grattan St
            </Typography>
          </Paper>
        </Grid>

        <Grid
          item
          style={{ margin: "auto", width: "60%", marginBottom: "10px" }}
        >
          <Paper
            variant="outlined"
            style={{ width: "50%", margin: "auto", height: "8vh" }}
          >
            <Typography variant="h6" style={{ margin: "auto" }}>
              Near Swanston St
            </Typography>
          </Paper>
        </Grid>

        <Grid item style={{ margin: "auto", width: "60%" }}>
          <Button
            component={Link}
            to={"/orders"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" disableElevation>
              Check In
            </Button>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Checkin;
