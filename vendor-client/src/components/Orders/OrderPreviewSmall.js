import { Container, Paper, Typography } from "@material-ui/core";

const OrderPreviewSmall = (props) => {
  return (
    <Paper variant="outlined">
      <Container>
        <Typography variant="h4">Order #{props.orderNumber}</Typography>
      </Container>
    </Paper>
  );
};

export default OrderPreviewSmall;
