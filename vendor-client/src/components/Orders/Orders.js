import { Container, Grid } from "@material-ui/core";
import Header from "../Header";
import CompletedOrder from "./CompletedOrder";
import OrderPreviewLarge from "./OrderPreviewLarge";
import OrderPreviewSmall from "./OrderPreviewSmall";

const Orders = (props) => {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <Container>
        <h1>Order List</h1>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={8}>
            <p>Ongoing Orders</p>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <OrderPreviewLarge orderNumber={105} />
              </Grid>
              <Grid item>
                <OrderPreviewSmall orderNumber={106} />
              </Grid>
              <Grid item>
                <OrderPreviewSmall orderNumber={107} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <p>Completed Orders</p>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <CompletedOrder orderNumber={104} />
              </Grid>
              <Grid item>
                <CompletedOrder orderNumber={103} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Orders;
