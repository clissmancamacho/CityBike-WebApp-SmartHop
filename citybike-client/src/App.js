import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

class App extends Component {
  constructor() {
    super()
    this.state = {
      stations: [],
      endpoint: "http://127.0.0.1:4001",
      loading: true,
      lat: 25.790654,
      lng: -80.1300455,
      zoom: 13,
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("dataMap", ({ network }) => {
      const { stations } = network
      this.setState({
        ...this.state,
        stations,
        loading: false,
      })
    })
  }

  render() {
    const { stations, loading } = this.state
    const position = [this.state.lat, this.state.lng]

    if (loading) {
      return (
        <div className="container-center loader-container">
          <div className="loader"></div>
        </div>
      )
    }
    return (
      <div>
        <h1 className="titleMap"> City Bikes in Miami </h1>
        <div className="container-center">
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map(
              (
                { latitude, longitude, name, free_bikes, empty_slots },
                index
              ) => (
                <Marker position={[latitude, longitude]} key={index}>
                  <Popup>
                    <div>
                      <h1 className="titleStation">{name}</h1>
                      <ul>
                        <li>Free Bikes: {free_bikes}</li>
                        <li>Empty Slots: {empty_slots}</li>
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              )
            )}
          </Map>
        </div>
      </div>
    )
  }
}
export default App
