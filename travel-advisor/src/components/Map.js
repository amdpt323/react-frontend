import React from 'react'
import { useGlobalContext } from '../context'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'

import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

const plotMap = ({lat,lng}) =>{
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      re
    >
      <TileLayer
        url='https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=54c54b3745004199951e16cf828ef00e'
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      />
    </MapContainer>
  )
}

const Map = () => {
  const {location} = useGlobalContext()
  return (
    plotMap({lat:location.lat,lng:location.lng})
  )
}

export default Map
