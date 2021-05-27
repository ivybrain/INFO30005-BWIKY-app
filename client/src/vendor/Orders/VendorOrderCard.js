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
  Button
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'


const time_limit = 15 // dummy time limit in mins

function dictify(list) {
  var out = {}
  if (list) {
    list.forEach((x) => (out[x._id] = x))
  }
  return out
}


function formatTime(time){
  var hours = new Date(time).getHours()
  var minutes = new Date(time).getMinutes()

  if (hours < 10){
    var temp = hours
    hours = "0" + temp
  }

  if (minutes < 10){
    var temp = minutes
    minutes = "0" + temp
  }

  return (hours + ":" + minutes)
}


function checkDiscount(order){
  const fulfilled_time = new Date(order.fulfilled_time)
  const modified_time = new Date(order.modified)

  if ((fulfilled_time-modified_time) > time_limit * 60000 ){
    console.log("Checking Discount")
    console.log((fulfilled_time-modified_time).toString())
    return true // Apply discount
  }else{
    return false // No discount
  }
}


function getDeadline(order){
  var new_time = new Date(order.modified)
  new_time.setMinutes(new_time.getMinutes() + time_limit );

  return (formatTime(new_time))
}


function getTimeRemaining(order){
  const limit = time_limit *60000// dummy time_limit to be replaced in milliseconds

  const current_time = new Date()
  const modified_time = new Date(order.modified)

  var countdown = limit - (current_time - modified_time)

  const minutes = Math.trunc((countdown / 1000) / 60) // convert milliseconds to minutes
  const seconds = Math.trunc((countdown / 1000) % 60) // convert milliseconds to seconds

  if (countdown > 0){
    return (minutes.toString() + ":" + seconds.toString())
  }else{
    return("0:00")
  }

}


function stringifyItems(order, itemDict){
  var string = ""
  var item_name = ""
  var quantity = 0
  var i;

  if (order && Object.keys(itemDict).length !== 0){

    for (i = 0; i < order.items.length; i++) {
      item_name = itemDict[order.items[i]['item']]['item_name']
      quantity = order.items[i].quantity
      string += item_name + " " + "x" + quantity + " "
    }
  }

  return string
}


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


const OrderCard = (props) => {
  const classes = useStyles();
  const [menu, setMenu] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [expanded, setExpanded] = React.useState(false);
  const columns = ["Item", "Qty", "Status"];
  const history = useHistory()

  const { order , auth, setAuth } = props

  var itemDict = {}
  var customer_name = ""

  // Accordian Handler
  const handleChange = (panel) => (event, isExpanded) => {
    // Expands panel when clicked
    setExpanded(isExpanded ? panel : false);
  }


  const handleFulfillOrder = (event) => {
    event.preventDefault()
    console.log('Fulfilling order')
    history.push('/vendor/orders')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${auth}`,
    }

    const data = {
      fulfilled: true
    }

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


  useEffect(() => {
    const headers = { 'Access-Control-Allow-Origin': '*' }

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
        <Typography className={classes.heading}>{getTimeRemaining(order)} mins</Typography>
        <Typography className={classes.secondaryHeading}>Order #{parseInt(order._id.slice(-4), 16).toString().slice(-4)} : {stringifyItems(order, itemDict)}</Typography>
      </AccordionSummary>

      {/*Individual Order Cards to be expanded*/}
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

                {Object.keys(itemDict).length !== 0 && (
                  <Grid item xs={8}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell key={column}>{column}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        {/*Mapping Items*/}
                        <TableBody>
                        {Object.keys(order.items).map((id, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              {itemDict[order.items[id]['item']]['item_name']}
                            </TableCell>

                            <TableCell>
                            {order.items[id].quantity}
                            </TableCell>

                            <TableCell>
                              <Checkbox
                                color="primary"
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

              {/*Customer Details*/}
              <Grid item xs={4}>
                <Typography variant="subtitle2" style={{ marginTop: "1em", marginLeft: "1em" }}>
                  Customer Details
                </Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Name : {customer_name}</Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Order Placed : {(new Date(order.modified)).getHours() + ":" + (new Date(order.modified)).getMinutes()}</Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Order Deadline : {getDeadline(order)}</Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Discount : {checkDiscount(order) ? "20" : "0"}%</Typography>

                {/*Button to mark order as fulfilled*/}
                <Button variant="outlined" style={{ marginLeft: "1em", marginTop: "1em"}} onClick={handleFulfillOrder}>
                  <Typography variant="button" display="block">
                    Complete
                  </Typography>
                </Button>
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
