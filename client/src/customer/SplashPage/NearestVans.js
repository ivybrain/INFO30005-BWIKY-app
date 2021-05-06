import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VanCard from './VanCard'

const NearestVans = (props) => {
  let { vans } = props
  // console.log(vans)
  vans = vans
    .filter((van) => van.hasOwnProperty('location'))
    .map((van) => ({
      ...van,
      simpleLocation: (van.location.simple ? van.location.simple : "above the wheel"),
      rating: 4,
    }))
  return (
    <Grid container direction="column" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h6" component="p">
          SNACKS near you
        </Typography>

        {vans.map((van, idx) => (
          <Grid item key={idx}>
            <VanCard
              key={idx}
              number={idx}
              title={van.van_name}
              rating={van.rating}
              distance={van.distance}
              simpleLocation={van.simpleLocation}
              _id={van._id}
            ></VanCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default NearestVans
