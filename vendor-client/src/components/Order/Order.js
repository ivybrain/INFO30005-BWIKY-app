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
    <>
      <Header />
      <Container>
        <Paper>
          <Typography variant="h3">Order #{props.match.params.id}</Typography>

          <TableContainer style={{ width: "60%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.item}>
                    <TableCell>{row.item}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      <Checkbox checked={row.status} color="primary"></Checkbox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Order;
