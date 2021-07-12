import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
