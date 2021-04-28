import { Grid, Typography } from "@material-ui/core";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <Grid
      container
      direction="row"
      style={{
        marginLeft: "10%",
        marginRight: "auto",
        height: "50px",
      }}
    >
      <Grid item xs={1}></Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={1}>
          <Logo></Logo>
        </Grid>
        <Grid item fontWeight="fontWeightBold">
          <Typography variant="h4" fontWeight="fontWeightBold">
            SNACKS IN A VAN
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
