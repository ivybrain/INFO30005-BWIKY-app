import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import OrderCard from '../Orders/OrderCard'

const MyOrder = (props) => {
  /*
  const [orderHistory, setOrderHistory] = useState([
    { items: [{ x: { quantity: 10, item_name: 'item 1' } }] },
    { items: [{ y: { quantity: 2, item_name: 'item 3' } }] },
  ])*/
  const [orders, setOrders] = useState(null);
  const customerId = '60921b0f82816b6063aef6fa'; // dummy customer ID

  useEffect(() => {
        axios('${API_URL}/customers/${customerId}/orders', {
            //headers: {
                //Authorization: cookies.Authorization
            //}
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    setOrders(result);
                });
    }, []);
/*
  useEffect(() => {
    const fetchData = async () => {

      const result = await axios(
        '${API_URL}/customers/${customerId}/orders',
      );
      console.log(result);
      setOrders(result);
    };

    fetchData();
  }, []);
  */
  //useEffect(() => {

    //axios(`${API_URL}/orders`, {
    //   headers,
    // })
    //   .then((res) => {
    //     let data = res.data
    //     data.distance = 10
    //     setVanData(data)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  //})
  return (
    <Container>
      <Typography variant="h2">My Orders</Typography>
      {orders.map((order) => (
        <OrderCard order={order}></OrderCard>
      ))}
    </Container>
  )
}

export default MyOrder
