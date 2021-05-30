import React from 'react';
import {
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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Button,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL , DISCOUNT } from '../../constants'
import {formatTime,
  checkDiscount,
  getDeadline,
  getTimeRemaining,
  stringifyItems} from '../../HelperFunctions'

// Style sheet
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.warning.light
  },
  secondaryHeading: {
    marginTop: '0.25em',
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '80%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
}));



// An individual Outstanding Order for Vendor
const OrderCard = (props) => {
  const classes = useStyles();
  const [customer, setCustomer] = useState(null)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = React.useState(false);
  const columns = ["Item", "Qty", "Status"];
  const history = useHistory()
  const { itemDict, order , auth, setAuth } = props
  var customer_name = ""

  // Handle order fulfilled pop up
  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }


  //  Handle expanding panel
  const handleChange = (panel) => (event, isExpanded) => {
    // Expands panel when clicked
    setExpanded(isExpanded ? panel : false);
  }

  // If Fulfill button was pressed
  const handleFulfillOrder = (event) => {
    event.preventDefault()
    console.log('Fulfilling order')
    history.push('/vendor/orders')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    // Mark order as fulfilled
    const data = {
      fulfilled: true
    }

    changeOpen() // trigger fulfilled order pop up

    axios({
      url: `${API_URL}/vendors/${order.vendor}/orders/${order._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })
      .catch((err) => {
        console.error(err)
      })
  }


  // Get customer's name
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`,
    }

    console.log('Getting Customer Name')

    axios(`${API_URL}/customers/${order.customer}`, {
        headers,
    }).then((res) => {
        setCustomer(res.data)
    })

    // Invalid Customer
    .catch((err) => {
        console.error(err)
        console.log("Invalid customer")
    })
  }, [])

  // Format customer name
  if (customer){
    customer_name = customer.given_name + " " + customer.family_name
  }

  return (
    <Card
      className={classes.root}
      style={{ marginBottom: '5px' }}
    >

    <Accordion expanded={expanded === order._id} onChange={handleChange(order._id)}>
    {/*Summary of Order Card (panel)*/}
      <AccordionSummary
        id= {order._id}
      >
        <Typography className={classes.heading}>{getTimeRemaining(order)} mins</Typography>
        <Typography className={classes.secondaryHeading}>
          Order #{parseInt(order._id.slice(-4), 16).toString().slice(-4)} : {stringifyItems(order, itemDict)}
        </Typography>
      </AccordionSummary>

      {/*Full Order Card when expanded*/}
      <AccordionDetails>
      <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <Container>
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

                {/*If dictionary of items is defined*/}
                {Object.keys(itemDict).length !== 0 && (
                  <Grid item xs={8}>
                    <TableContainer>
                      <Table>

                      {/*Mapping table column names*/}
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell key={column}>{column}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        {/*Mapping item names and quantities to the table*/}
                        <TableBody>
                        {Object.keys(order.items).map((id, idx) => (
                          <TableRow key={idx}>

                          {/*Mapping item names using dictionary*/}
                            <TableCell>
                              {itemDict[order.items[id]['item']]['item_name']}
                            </TableCell>

                          {/*Mapping item quantities in order*/}
                            <TableCell>
                            {order.items[id].quantity}
                            </TableCell>

                            {/*Status checkboxes for each item for vendors
                              to check their progres on the order*/}
                            <TableCell>
                              <Checkbox
                                color="green"
                              ></Checkbox>
                            </TableCell>

                          </TableRow>
                        ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
                </Grid>
              </Grid>

              {/*Display ustomer Details*/}
              <Grid item xs={4}>
                <Typography variant="subtitle2" style={{ marginTop: "1em", marginLeft: "1em" }}>
                  Customer Details
                </Typography>

                <Typography variant="body2" style={{ marginTop: "0.5em", marginLeft: "1em" }}>
                  Name : {customer_name}
                </Typography>

                <Typography variant="body2" style={{ marginTop: "0.5em", marginLeft: "1em" }}>
                  Order Placed : {formatTime(order.modified)}
                </Typography>

                <Typography variant="body2" style={{ marginTop: "0.5em", marginLeft: "1em" }}>
                  Order Deadline : {getDeadline(order)}
                </Typography>

                <Typography variant="body2" style={{ marginTop: "0.5em", marginLeft: "1em" }}>
                  Discount : {checkDiscount(order) ? DISCOUNT : 0}%
                </Typography>

                {/*Button to mark order as fulfilled*/}
                <Button variant="outlined"
                  color="orange"
                  style={{ marginLeft: "1em", marginTop: "1em"}}
                  onClick={handleFulfillOrder}>
                  <Typography variant="button"
                    color="orange"
                    display="block">
                    Complete
                  </Typography>
                </Button>

                {/*Message to be flashed when order is fulfilled*/}
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  onClose={handleClose}
                  message="Order marked as complete!"
                />

              </Grid>
            </Grid>
        </Container>
      </div>
      </AccordionDetails>
    </Accordion>
    </Card>
  );
};

export default OrderCard;
