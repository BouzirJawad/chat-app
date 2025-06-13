const express = require("express")
const http = require('http')
const cors = require ("cors")
const { Server } = require('socket.io')
const setupSocket = require('./socket')
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7460

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
})

setupSocket(io)

connectDB()

app.use("/api", authRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})