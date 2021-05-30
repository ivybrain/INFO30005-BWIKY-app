import { Container, Typography, Grid , Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import Ratings from 'react-ratings-declarative'
import MenuItem from '../VanDetails/MenuItem'
import { Link, Redirect, useHistory } from 'react-router-dom'



const VanDetails = (props) => {
  const { auth, vans, menu, setMenu, order, setOrder } = props
  const id = props.match.params.id
  const [vanData, setVanData] = useState(null)
  const history = useHistory()


  // Customer cancels order
  const handleCancelOrder = (e) => {
    e.preventDefault()
    setOrder({ items: {}, confirmed: false })
    console.log('cleared order')
  }


  useEffect(() => {
    if (!vanData) {
      if (vans) {
        // Get the van from vans with the same ID
        const vansWithCorrectName = vans.filter((van) => van._id === id)
        if (vansWithCorrectName.length !== 0) {
          console.log('found this van without needing another API call')
          setVanData(vansWithCorrectName[0])
        }
      } else {
        // Try to get the van information from the API
        console.log('getting individual van data')
        const headers = { 'Access-Control-Allow-Origin': '*' }

        axios(`${API_URL}/vendors/${id}`, {
          headers,
        })
          .then((res) => {
            let data = res.data
            setVanData(data)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }, [vanData, vans, id])

  useEffect(() => {
    if (!menu) {
      console.log('getting menu')
      const headers = { 'Access-Control-Allow-Origin': '*' }

      axios(`${API_URL}/items`, {
        headers,
      })
        .then((res) => {
          setMenu(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  return (
    <Container>
      {vanData === null || vanData === undefined ? (
        <Typography variant="h3">Van Details Loading...</Typography>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3">{vanData.van_name}</Typography>
          <Typography
            variant="body"
            display="block"
            style={{ marginBottom: '1rem' }}
          >
            {!isNaN(vanData.distance)
              ? `This van is ${Math.round(vanData.distance * 10) / 10}km away!`
              : null}
          </Typography>
          <Ratings rating={vanData.rating} widgetDimensions="30px" widgetSpacings="8px">
            <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
            <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
            <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
            <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
            <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
          </Ratings>

          {menu === null ? (
            ''
          ) : (
            <>
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ marginTop: '2rem' }}
              >
              {/* Display all items on vendor's menu*/}

                {menu.map((menuItem, idx) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                    <MenuItem
                      key={idx}
                      menuItem={menuItem}
                      order={order}
                      setOrder={setOrder}
                      vendor={vanData._id}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      )}

      <br />

      <Grid container style={{ justifyContent: 'space-around' }}>

        <Grid item>
          <Button variant="outlined" color="orange" onClick={handleCancelOrder}>
            <Typography variant="button" color="orange" display="block" gutterBottom>
              Cancel Order
            </Typography>
          </Button>
        </Grid>

        <Grid item>
          <Button variant="outlined"
            color="orange"
            component={Link}
            to="/customer/myorder"
            style={{ textDecoration: 'none' }}>
            <Typography variant="button" color="orange" display="block" gutterBottom>
              Review Order
            </Typography>
          </Button>
          {order.confirmed ? <Redirect to="/customer/orders" /> : null}
        </Grid>

      </Grid>
      <br/ >
    </Container>
  )
}

export default VanDetails
