import {
  Paper,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Checkbox,
  Grid,
} from "@material-ui/core";
import Header from "../Header";

const Order = (props) => {
  const columns = ["Item", "Qty", "Status"];

  const rows = [
    {
      item: "Small cake",
      quantity: 2,
      status: false,
    },
    {
      item: "Cappuccino",
      quantity: 1,
      status: false,
    },
  ];

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <Container>
        <Paper style={{ height: "85vh" }}>
          <Typography variant="h3">Order #{props.match.params.id}</Typography>

          <Grid
            container
            direction="row"
            justify="space-around"
            spacing={3}
            style={{ height: "100%" }}
          >
            <Grid item xs={7}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                style={{ height: "100%" }}
              >
                <Grid item xs>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.item}>
                            <TableCell>{row.item}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={row.status}
                                color="primary"
                              ></Checkbox>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs>
                  <Typography variant="body1">
                    Time before discount must be given:
                  </Typography>
                  <Typography variant="h5">10:42 minutes</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" style={{ marginTop: "1em" }}>
                Customer info
              </Typography>
              <br />
              <Typography variant="body1">Wendy Ang</Typography>
              <br />
              <Typography variant="body1">Order Placed:</Typography>
              <br />
              <Typography variant="body1">Order Completed:</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Order;
