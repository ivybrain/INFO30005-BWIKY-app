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


function dictify(list) {
  var out = {}
  if (list) {
    list.forEach((x) => (out[x._id] = x))
  }
  return out
}


function stringifyItems(order, itemDict){
  var string = ""
  var item_name = ""
  var quantity = 0
  var i;

  if (order && Object.keys(itemDict).length !== 0){
    console.log("stringify")

    for (i = 0; i < order.items.length; i++) {
      item_name = itemDict[order.items[i]['item']]['item_name']
      quantity = order.items[i].quantity
      string += item_name + " " + "x" + quantity + " "
    }
  }

  console.log(string)

  return string
}

function getDeadline(order){
  const time_limit = 15// dummy time limit in mins

  var new_time = new Date(order.modified)
  new_time.setMinutes(new_time.getMinutes() + time_limit );

  return (new_time.getHours() + ":" + new_time.getMinutes())
}

function getTimeRemaining(order){
  const time_limit = 15 *60000// dummy time_limit to be replaced in milliseconds

  const current_time = new Date()
  const modified_time = new Date(order.modified)

  var countdown = time_limit - (current_time - modified_time)

  const minutes = Math.trunc((countdown / 1000) / 60) // convert milliseconds to minutes
  const seconds = Math.trunc((countdown / 1000) % 60) // convert milliseconds to seconds

  if (countdown > 0){
    return (minutes.toString() + ":" + seconds.toString())
  }else{
    return("0:00")
  }

}

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


const FulfilledOrderCard = (props) => {
  const classes = useStyles();
  const [menu, setMenu] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [expanded, setExpanded] = React.useState(false);
  const { order } = props
  var itemDict = {}
  var customer_name = ""
  const columns = ["Item", "Qty", "Status"];
  const history = useHistory()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handlePickUpOrder = (event) => {
    event.preventDefault()

    console.log('Picking up order')

    history.push('/vendor/orders')

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer totessecure`, // override for testing
    }

    const data = {
      picked_up: true
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

  const headers = { 'Access-Control-Allow-Origin': '*' }

  useEffect(() => {
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
    console.log('getting items')

    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])

  itemDict = dictify(menu)

  if (customer){
    customer_name = customer.given_name + " " + customer.family_name
  }


  console.log('After dictify')
  console.log(itemDict)
  console.log(Object.keys(itemDict).length)


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
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Order Placed : {(new Date(order.modified)).getHours() + ":" + (new Date(order.modified)).getMinutes()}</Typography>
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Order Fulfilled : {(new Date(order.fulfilled_time)).getHours() + ":" + (new Date(order.fulfilled_time)).getMinutes()}</Typography>
                <Typography variant="body2" style={{ marginBottom: "1em" }}>Discount : {getTimeRemaining(order)==="0:00" ? "20" : "0"}%</Typography>

                {/*Button to mark order as fulfilled*/}
                <Button variant="outlined" style={{marginTop: "1em"}} onClick={handlePickUpOrder}>
                  <Typography variant="button" display="block">
                    Picked Up
                  </Typography>
                </Button>
              </Grid>
        </Container>
      </div>
      </AccordionDetails>
    </Accordion>
    </Card>
  );
};

export default FulfilledOrderCard;
