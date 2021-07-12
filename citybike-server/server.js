const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const axios = require("axios")
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"

const port = process.env.PORT || 4001
const index = require("./routes/index")
const app = express()

app.use(index)

const server = http.createServer(app)
const io = socketIo(server) // < Interesting!
let interval = 1000

const fetchDataBikes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(citybikeurl)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

io.on("connection", (socket) => {
  var socketId = socket.id
  var clientIp = socket.request.connection.remoteAddress
  console.log("New connection " + socketId + " from " + clientIp)

  setInterval(async () => {
    fetchDataBikes()
      .then((data) => {
        socket.emit("dataMap", data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, interval)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
