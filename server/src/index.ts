import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// 模拟实时数据
const generateRandomData = () => {
  return {
    timestamp: new Date().toISOString(),
    value: Math.random() * 100,
    category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
  };
};

// Socket.IO 连接处理
io.on('connection', (socket) => {
  console.log('Client connected');

  // 每秒发送一次数据
  const interval = setInterval(() => {
    socket.emit('dataUpdate', generateRandomData());
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 