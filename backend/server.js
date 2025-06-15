const express = require("express");
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io');
const setupSocket = require('./socket');
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7460;

app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Initialize Socket.IO
setupSocket(io);

// Connect to MongoDB
connectDB();

// REST API routes
app.use("/api", authRoutes);

// Start the server (IMPORTANT: use `server.listen` not `app.listen`)
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
