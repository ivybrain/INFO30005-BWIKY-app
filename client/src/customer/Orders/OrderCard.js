import {
  Card,
  CardContent,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,

} from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';

const columns = ['Item', 'Qty', 'Subtotal']

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function dictify(list){
  var out = {};
  if (list){
    list.forEach(x => out[x._id] = x);
  }
  return out;

};

function setMenu(res){
  return (dictify(res.body));
}

const OrderCard = (props) => {
  const { order } = props
  const [vendor, setVendor] = useState('')
  const [menu, setMenu] = useState(null)
  //const itemDict = {}

  const classes = useStyles();

  useEffect(() => {
      console.log('getting vendor and items')
      const headers = { 'Access-Control-Allow-Origin': '*' }

      axios(`${API_URL}/vendors/${order.vendor}`, {
        headers,
      }).then((res) => {
        console.log(res.data.van_name);
        setVendor(res.data.van_name);
      })

      axios(`${API_URL}/items`, {
        headers,
      }).then((res) => {
        // const itemDict = dictify(res.body);
        //const dictFilled = true;
        //console.log(itemDict.length);
        setMenu(res);
      })
  }, [])

  //console.log(itemDict);
  console.log(menu);
  console.log(!!menu);
  //const itemDict = dictify(menu);

  return (

      <Card className={classes.root} variant="outlined" style={{ marginTop: '20px' }}>
      {itemDict.length != 0 &&
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Order {order._id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Bought from {vendor} on {order.modified}
          </Typography>

          {!!menu && order.items && Object.keys(order.items).length !== 0 &&
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Object.keys(order.items).map((id, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{menu[order.items[id]['item']]['item_name']}</TableCell>
                        <TableCell>{order.items[id].quantity}</TableCell>
                        <TableCell>
                          {audFormatter.format(
                          order.items[id].quantity * menu[order.items[id]['item']]['item_price'],
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" gutterBottom>
                          Total:{' '}
                          {audFormatter.format(
                            Object.keys(order.items)
                              .map(
                                (id) =>
                                  order.items[id].quantity
                                 * menu[order.items[id]['item']]['item_price'],

                              )
                              .reduce((a, b) => a + b),
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              </>
          }

    </CardContent>
    }
  </Card>


  )
}

export default OrderCard
