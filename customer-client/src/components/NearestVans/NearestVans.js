import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VanCard from './VanCard'

const NearestVans = (props) => {
  return (
    <Grid container direction="column" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h6" component="p">
          SNACKS near you
        </Typography>
      </Grid>
      <Grid item>
        <VanCard
          title="Tasty Trailer"
          rating={5}
          distance={1}
          simpleLocation="on Grattan St outside Melbourne Uni"
        ></VanCard>
      </Grid>
      <Grid item>
        <VanCard
          title="Breakfast on Wheels"
          rating={2}
          distance={2.7}
          simpleLocation="above the wheels"
        ></VanCard>
      </Grid>
      <Grid item>
        <VanCard
          title="Yummie Yummie"
          rating={4}
          distance={4.3}
          simpleLocation="in my tummie"
        ></VanCard>
      </Grid>
    </Grid>
  )
}

export default NearestVans
