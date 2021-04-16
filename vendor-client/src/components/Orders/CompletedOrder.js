import { Paper, Typography } from "@material-ui/core";

const CompletedOrder = (props) => {
  return (
    <Paper>
      <Typography variant="h4">Order #{props.orderNumber}</Typography>
    </Paper>
  );
};

export default CompletedOrder;
