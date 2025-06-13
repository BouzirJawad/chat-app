const redis = require('./redis');

module.exports = function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('create_room', async ({ username }) => {
      const roomCode = Math.random().toString(36).substring(2, 8);
      socket.join(roomCode);
      socket.roomCode = roomCode;
      socket.username = username;
      io.to(roomCode).emit('room_created', { roomCode }); // 🔄 keep naming consistent with frontend
      console.log(`${username} created room ${roomCode}`);
    });

    socket.on('join_room', ({ roomCode, username }) => {
      socket.join(roomCode);
      socket.roomCode = roomCode;
      socket.username = username;
      socket.to(roomCode).emit('user_joined', { username }); // ✅ FIXED typo: `socket.io` → `socket.to`
    });

    socket.on('send_message', async ({ roomCode, message }) => {
      const payload = {
        username: socket.username,
        message,
        timestamp: new Date().toISOString(),
      };

      await redis.lpush(`room:${roomCode}:messages`, JSON.stringify(payload)); // ✅ FIXED Redis key typo (space)
      io.to(roomCode).emit('receive_message', payload);
    });

    socket.on('get_messages', async ({ roomCode }) => {
      const messages = await redis.lrange(`room:${roomCode}:messages`, 0, 49);
      const parsedMessages = messages.map((msg) => JSON.parse(msg)).reverse();
      socket.emit('message_history', parsedMessages); // 🔄 consistent event name
    });

    socket.on('disconnect', () => {
      console.log(`${socket.username || 'User'} disconnected`);
    });
  });
};
