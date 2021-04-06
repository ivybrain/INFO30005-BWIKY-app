import { Container, Grid, Paper, TextField } from "@material-ui/core";

const Checkin = () => {
  return (
    <Container>
      <Grid container direction="column" justify="center" spacing={3}>
        <Grid item>
          <Paper style={{ width: "50%", margin: "auto" }}>
            <TextField variant="outlined" style={{ width: "100%" }}></TextField>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkin;
