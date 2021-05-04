import { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl'
import Logo from '../Logo/Logo'

const userLocationStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf',
  },
}

const VanMap = (props) => {
  const { vans, location } = props

  const [viewport, setViewport] = useState({
    width: 'fit',
    height: '50vh',
    latitude: -37.80435,
    longitude: 144.96296,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  })

  useEffect(() => {
    if (location != null) {
      setViewport({
        ...viewport,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }
  }, [location])

  return (
    <div style={{ borderRadius: '10px' }}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        style={{ borderRadius: '50px' }}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {/* {markers.map((marker) => (
          <Marker latitude={marker.latitude} longitude={marker.longitude}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={0}
            >
              <Grid item>
                <Logo style={{ width: '50%' }}></Logo>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item>
                <Card style={{ height: '50px' }}>
                  <CardContent>
                    <Typography variant="h6">{marker.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <div style={{ backgroundColor: 'white' }}>
              
            </div>
          </Marker>
        ))} */}
        {vans !== null
          ? vans
              .filter((van) => van.hasOwnProperty('location'))
              .map((van) => ({
                latitude: parseFloat(van.location.lat),
                longitude: parseFloat(van.location.long),
                label: van.van_name,
              }))
              .map((marker) => (
                <Marker
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  key={marker.label}
                >
                  <Logo></Logo>
                </Marker>
              ))
          : ''}
        ==
        {location == null ? (
          ''
        ) : (
          <Source
            id="userLocation"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      location.coords.longitude,
                      location.coords.latitude,
                      // 145.0224,
                      // -37.8586,
                      // 144.96296,
                      // -37.80435,
                    ],
                  },
                },
              ],
            }}
          >
            <Layer {...userLocationStyle} />
          </Source>
        )}
        {/* <Source
          id="userLocation"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [
                    // location.coords.longitude,
                    // location.coords.latitude,
                    145.0224,
                    -37.8586,
                    // 144.96296,
                    // -37.80435,
                  ],
                },
              },
            ],
          }}
        >
          <Layer {...userLocationStyle} />
        </Source> */}
      </ReactMapGL>
    </div>
  )
}

export default VanMap
