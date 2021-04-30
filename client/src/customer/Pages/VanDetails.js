import { Container, Typography, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import Ratings from 'react-ratings-declarative'
import MenuItem from '../VanDetails/MenuItem'

const VanDetails = (props) => {
  const { vans, menu, setMenu, order, setOrder } = props
  const id = props.match.params.id

  const [vanData, setVanData] = useState(null)

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
            data.distance = 10
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
          <Typography variant="h3">Van Details {vanData.van_name}</Typography>
          <Typography variant="body">
            This van is {Math.round(vanData.distance * 10) / 10}km away!
          </Typography>
          <Ratings
            rating={parseFloat(4)}
            widgetDimensions="30px"
            widgetSpacings="8px"
          >
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
              <Typography variant="body">Menu</Typography>
              <Grid container direction="row" spacing={2}>
                {menu.map((menuItem, idx) => (
                  <MenuItem
                    key={idx}
                    menuItem={menuItem}
                    order={order}
                    setOrder={setOrder}
                  ></MenuItem>
                ))}
              </Grid>
            </>
          )}
        </div>
      )}
    </Container>
  )
}

export default VanDetails