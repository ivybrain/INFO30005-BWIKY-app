import React from 'react'
import { useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'

const vanMarkerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#FF914D',
  },
}

const vanGeographicData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [144.96296, -37.80435] },
    },
  ],
}

const VanMap = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: -37.80435,
    longitude: 144.96296,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  })

  return (
    <div style={{ borderRadius: '10px' }}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        style={{ width: '100%', borderRadius: '50px' }}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {' '}
        <Source id="vanData" type="geojson" data={vanGeographicData}>
          <Layer {...vanMarkerStyle} />
        </Source>
      </ReactMapGL>
    </div>
  )
}

export default VanMap
