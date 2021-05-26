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
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


const OrderCard = (props) => {
  const classes = useStyles();
  const [menu, setMenu] = useState(null)
  const [expanded, setExpanded] = React.useState(false);
  const { order } = props
  var itemDict = {}
  const columns = ["Item", "Qty", "Status"];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  useEffect(() => {
    console.log('getting items')

    axios(`${API_URL}/items`).then((res) => {
      setMenu(res.data)
    })
  }, [])

  itemDict = dictify(menu)
  console.log('After dictify')
  console.log(itemDict)
  console.log(Object.keys(itemDict).length)


  /*
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
  */
  return (
    <div className={classes.root}>

    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

    {/*Summary of Order Card*/}
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>Order #{parseInt(order._id.slice(-4), 16).toString().slice(-4)} 10:00</Typography>
        <Typography className={classes.secondaryHeading}>{stringifyItems(order, itemDict)}</Typography>
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
                  <Grid item xs>
                  <br/>
                    <Typography variant="body1">
                      Time before discount must be given:
                    </Typography>
                    <Typography variant="h5">10:42 minutes</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/*Customer Details*/}
              <Grid item xs={4}>
                <Typography variant="subtitle2" style={{ marginTop: "1em", marginLeft: "1em" }}>
                  Customer info
                </Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Wendy Ang</Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Order Placed:</Typography>
                <br />
                <Typography variant="body2" style={{ marginLeft: "1em" }}>Order Completed:</Typography>
              </Grid>
            </Grid>
        </Container>
      </div>
      </AccordionDetails>
    </Accordion>
    </div>

  );
};

export default OrderCard;
