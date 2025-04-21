// server/server.js
const express = require('express');               // Express web framework :contentReference[oaicite:0]{index=0}
const http    = require('node:http');
const cors    = require('cors');                  // CORS middleware :contentReference[oaicite:1]{index=1}
const { Server } = require('socket.io');          // Socket.IO server :contentReference[oaicite:2]{index=2}

const PORT = process.env.PORT || 4000;

// 1. Create Express app and apply middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client's origin
  methods: ['GET', 'POST'],
  credentials: true
}));app.use(express.json());

// Optional health‑check route
app.get('/health', (_req, res) => {
  res.status(200).send('🟢 Server is up');
});

// 2. Wrap Express in an HTTP server
const httpServer = http.createServer(app);

// 3. Attach Socket.IO to the same HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('send', (payload) => {
    console.log('Received send event:', payload);
    io.emit('send', payload);
  });

  socket.on('delete_message', (chatId) => {
    console.log('Received delete_message event for chatId:', chatId);
    io.emit('delete_message', chatId);
  });

  socket.on('delete_chat', (chatId) => {
    console.log('Received delete_chat event for chatId:', chatId);
    io.emit('delete_chat', chatId);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});


// 4. Start listening
httpServer.listen(PORT, () => {
  console.log(`🚀 Express + Socket.IO listening on http://localhost:${PORT}`);
});
