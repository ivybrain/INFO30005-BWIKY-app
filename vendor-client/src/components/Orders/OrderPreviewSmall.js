import { Paper, Typography } from "@material-ui/core";

const OrderPreviewSmall = (props) => {
  return (
    <Paper>
      <Typography variant="h4">Order #{props.orderNumber}</Typography>
    </Paper>
  );
};

export default OrderPreviewSmall;
