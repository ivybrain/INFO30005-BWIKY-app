import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Header from "../Header";
import OrderDisplay from "./OrderDisplay";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledAccordion = withStyles({
  root: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "#fafafa",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 5,
    },
    "&:before": {
      display: "none",
    },

    marginBottom: "1rem",
  },
  //   content: {
  //     "&:not($expanded)": {
  //       margin: "12px 0",
  //       borderBottom: "1px solid rgba(0, 0, 0, .125)",
  //     },
  //   },
  expanded: {},
})(Accordion);

const StyledAccordianSummary = withStyles({
  root: {
    backgroundColor: "#fafafa !important",
    borderBottom: "0px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
      borderBottom: "0px solid rgba(0, 0, 0, .125)  !important",
    },
  },
  expanded: {},
})(AccordionSummary);

const StyledAccordionDetails = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: theme.spacing(2),
  },
}))(AccordionDetails);

const OrderHistory = (props) => {
  const orders = [
    {
      orderPlaced: "2.20pm",
      orderNumber: 1024,
      items: [
        {
          name: "Cappucino",
          quantity: "1",
        },
        {
          name: "Flat White",
          quantity: "3",
        },
      ],
    },
    {
      orderPlaced: "2.30pm",
      orderNumber: 1025,
      items: [
        {
          name: "Cappucino",
          quantity: "2",
        },
        {
          name: "Flat White",
          quantity: "2",
        },
      ],
    },
  ];

  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <Container>
        <h1>Order List</h1>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          {/* {orders.map((order) => (
            <OrderDisplay order={order} />
          ))} */}

          {orders.map((order, idx) => (
            <StyledAccordion
              square
              //   variant="outlined"
              expanded={expanded === `panel${idx}`}
              onChange={handleChange(`panel${idx}`)}
              component={Paper}
            >
              <StyledAccordianSummary>
                <Typography variant="h6">ORDER #{order.orderNumber}</Typography>
              </StyledAccordianSummary>
              <StyledAccordionDetails>
                <Typography>Placed on {order.orderPlaced}</Typography>
              </StyledAccordionDetails>
            </StyledAccordion>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default OrderHistory;
