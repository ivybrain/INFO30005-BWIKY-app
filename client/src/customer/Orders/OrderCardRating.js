import {
  Typography,
  Button,
  Grid,
  Snackbar,
  Box,
  TextField,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import { useEffect, useState } from 'react'
import axios from 'axios'

import { API_URL } from '../../constants'

const OrderCardRating = (props) => {
  const { auth, order } = props
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')

  const [rating_open, setRatingOpen] = useState(false)

  // Get initial rating and comment
  useEffect(() => {
    console.log('getting rating')
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    axios(`${API_URL}/vendors/${order.vendor}/orders/${order._id}`, {
      headers,
    }).then((res) => {
      console.log(res.data.rating)
      setRating(res.data.rating)
      setComment(res.data.comment)
      if (res.data.comment) {
        console.log(res.data.comment)
      }
    })
  }, [])

  // Handle pop up notifications for ratings
  const ratingSubmitted = () => {
    setRatingOpen((rating_open) => !rating_open)
  }

  const handleRatingClose = () => {
    setRatingOpen(false)
  }

  // If a customer changes their rating, PATCH to database
  const postRating = (newRating) => {
    console.log('Ratings changed to:')
    console.log(newRating)

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    const data = {
      rating: newRating, // set new rating
    }

    // PATCH customer's rating
    axios({
      url: `${API_URL}/vendors/${order.vendor}/orders/${order._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })
      .then((res) => {
        if (res.data) {
          console.log('Changed rating for %s to', order.vendor)
          console.log(res.data)
        }
      })

      .catch((err) => {
        console.error(err)
      })
  }

  // If customer submits a comment with their rating
  const handle_comment_submit = (event) => {
    event.preventDefault()

    ratingSubmitted()

    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth}`,
    }

    const data = {
      comment: event.target.comment.value, // set customer comment
    }

    // PATCH customer's rating
    axios({
      url: `${API_URL}/vendors/${order.vendor}/orders/${order._id}`,
      method: 'PATCH',
      data: data,
      headers: headers,
    })
      .then((res) => {
        if (res.data) {
          console.log('Submitted comment:')
          console.log(res.data)
        }
      })

      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <>
      {/*UI for customers to rate experience*/}
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">
          Please take a moment to rate your experience!
        </Typography>
        <Rating
          name={'customer-rating' + order._id}
          precision={0.5}
          size="large"
          value={rating}
          onChange={(event, newRating) => {
            setRating(newRating)
            console.log(newRating)
            postRating(newRating)
          }}
        />

        {/*UI for customers to submit a comment*/}
        <form noValidate autoComplete="off" onSubmit={handle_comment_submit}>
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              name="comment"
              label="Comment"
              color="orange"
              defaultValue={comment}
              variant={comment ? 'filled' : 'outlined'}
              style={{ width: '70%' }}
            />
          </Grid>

          {/*Button to submit*/}
          <Button
            variant="contained"
            color="orange"
            style={{ marginTop: '1em', marginBottom: '1em' }}
            disableElevation
          >
            Submit
          </Button>
        </form>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={rating_open}
        onClose={handleRatingClose}
        message="Thanks for reviewing!"
      />
    </>
  )
}

export default OrderCardRating
