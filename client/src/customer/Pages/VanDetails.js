import {
  Container,
  Typography,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import Ratings from 'react-ratings-declarative'
import MenuItem from '../VanDetails/MenuItem'
import { Link } from 'react-router-dom'

const VanDetails = (props) => {
  const { vans, menu, setMenu, order, setOrder } = props
  const id = props.match.params.id

  const [vanData, setVanData] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [rating, setRating] = useState(
    parseFloat(4 + Math.floor(Math.random() * 3 - 1)),
  )

  // Whenever the order updates, check if we have reached 3 snacks
  useEffect(() => {
    if (Object.keys(order.items).length >= 3) {
      console.log('3 snacks reached')
      setOpen(true)
    }
  }, [order])

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
          <Ratings rating={rating} widgetDimensions="30px" widgetSpacings="8px">
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="three-snacks-reached"
          aria-describedby="three-snacks-reached"
        >
          <DialogTitle id="three-snacks-reached">
            {'Continue shopping?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="three-snacks-reached">
              You have reached the maximum number of snacks available in one
              order. You can add more of the same three snacks or review your
              order!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Continue Shopping
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              <Button
                component={Link}
                to="/customer/myorder"
                style={{ textDecoration: 'none' }}
              >
                Review Order
              </Button>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  )
}

export default VanDetails
