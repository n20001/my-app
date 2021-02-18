import React from 'react'
import './App.css'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false
    }
    this.URI = 'https://api.wheretheiss.at/v1/satellites/25544'
  }

  componentDidMount () {
    this.intervalId = setInterval(() => this.loadData(), 1000)
    this.loadData()
  }

  loadData () {
    window
      .fetch(this.URI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          isLoaded: true,
          lat: data.latitude,
          lng: data.longitude
        })
      )
  }

  render () {
    const isLoaded = this.state.isLoaded
    const position = [this.state.lat, this.state.lng]
    if (!isLoaded) {
      return <h1>Loading</h1>
    } else {
      return (
        <>
          <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>Now here</Popup>
            </Marker>
          </MapContainer>
          <TestPosition lng={this.state.lng} lat={this.state.lat} />
        </>
      )
    }
  }
}
const TestPosition = props => {
  return (
    <>
      <p>経度:{props.lng}</p>
      <p>緯度:{props.lat}</p>
    </>
  )
}

export default App
