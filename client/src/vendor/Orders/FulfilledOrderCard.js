import React from 'react';
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

import { API_URL } from '../../constants'
import {dictify,
  formatTime,
  checkDiscount,
  getDeadline,
  getTimeRemaining,
  stringifyItems} from '../../HelperFunctions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.success.light
  },
  secondaryHeading: {
    marginTop: '0.25em',
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
}));


// Orders which are fulfilled and waiting to be picked up
const FulfilledOrderCard = (props) => {
  const classes = useStyles();
  const [menu, setMenu] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [expanded, setExpanded] = React.useState(false);
  const columns = ["Item", "Qty", "Status"];
  const history = useHistory()

  const { order , auth, setAuth } = props
  var itemDict = {}
  var customer_name = ""

  const [open, setOpen] = useState(false)

  // Handle Pop Up
  const changeOpen = () => {
    setOpen((open) => !open)
  }

  const handleClose = () => {
    setOpen(false)
  }


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }


  const handlePickUpOrder = (event) => {
    event.preventDefault()
    history.push('/vendor/orders')

    console.log('Picking up order')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    const data = {
      picked_up: true
    }

    changeOpen()

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

  useEffect(() => {
    console.log('Getting Customer Name')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

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


  useEffect(() => {
    console.log('getting items')

    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])


  itemDict = dictify(menu)

  if (customer){
    customer_name = customer.given_name + " " + customer.family_name
  }


  return (
    <Card
      className={classes.root}
      style={{ marginBottom: '5px' }}
    >

    <Accordion expanded={expanded === order._id} onChange={handleChange(order._id)}>
    {/*Summary of Order Card*/}
      <AccordionSummary
        id= {order._id}
      >
        <Typography className={classes.heading}>Order #{parseInt(order._id.slice(-4), 16).toString().slice(-4)}</Typography>
        <Typography className={classes.secondaryHeading}>{customer_name}</Typography>
      </AccordionSummary>

      {/*Individual Order Cards to be expanded*/}
      <AccordionDetails>
      <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <Container>
              {/*Customer Details*/}
              <Grid item xs={12}>
                <Typography variant="subtitle2" style={{ marginBottom: "1em" }}>{stringifyItems(order, itemDict)}</Typography>
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Order Placed : {formatTime(order.modified)}</Typography>
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Order Fulfilled : {formatTime(order.fulfilled_time)}</Typography>
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Discount : {checkDiscount(order) ? "20" : "0"}%</Typography>

                {/*Button to mark order as fulfilled*/}
                <Button variant="outlined" style={{marginTop: "1em"}} onClick={handlePickUpOrder}>
                  <Typography variant="button" display="block">
                    Picked Up
                  </Typography>
                </Button>

                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  onClose={handleClose}
                  message="Order marked as picked up!"
                />

              </Grid>
        </Container>
      </div>
      </AccordionDetails>
    </Accordion>
    </Card>
  );
};

export default FulfilledOrderCard;
