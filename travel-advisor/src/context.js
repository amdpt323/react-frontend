import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [search, setSearch] = useState('education.school')
  const [results, setResults] = useState([])
  const [location, setLocation] = useState({
    lat: '26.51045933116816',
    lng: '100.22787127564763',
    searched:false,
  })

  useEffect(() => {
    fetchData()
  }, [search,location])

  const fetchData = async () => {
    if (location.searched===false) {
      getLocation()
    }
    await axios
      .get(
        `https://api.geoapify.com/v2/places?categories=${search}&filter=circle:${location.lng},${location.lat},5000&bias=proximity:${location.lng},${location.lat}&limit=20&apiKey=54c54b3745004199951e16cf828ef00e`
      )
      .then(({ data }) => {
        const features = data.features
        setResults(features)
      })
      .catch((error) => console.log(error))
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('ahdjhfnkjas')
    }
  }

  const showPosition = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      searched:true,
    })
    console.log(position)
  }

  return (
    <AppContext.Provider value={{ search, setSearch, results,location }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return React.useContext(AppContext)
}

export { AppContext, AppProvider }
