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

// 定义数据类型接口
interface SensorData {
  temperature: number;
  humidity: number;
  pressure: number;
  voltage: number;
  current: number;
  power: number;
  timestamp: string;
}

interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    upload: number;
    download: number;
  };
  timestamp: string;
}

interface AlertData {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

// 生成随机数据
const generateSensorData = (): SensorData => ({
  temperature: Number((20 + Math.random() * 30).toFixed(2)),
  humidity: Number((30 + Math.random() * 50).toFixed(2)),
  pressure: Number((980 + Math.random() * 40).toFixed(2)),
  voltage: Number((220 + Math.random() * 10).toFixed(2)),
  current: Number((1 + Math.random() * 5).toFixed(2)),
  power: Number((220 + Math.random() * 1000).toFixed(2)),
  timestamp: new Date().toISOString()
});

const generateSystemStatus = (): SystemStatus => ({
  cpu: Number((Math.random() * 100).toFixed(2)),
  memory: Number((Math.random() * 100).toFixed(2)),
  disk: Number((Math.random() * 100).toFixed(2)),
  network: {
    upload: Number((Math.random() * 100).toFixed(2)),
    download: Number((Math.random() * 100).toFixed(2))
  },
  timestamp: new Date().toISOString()
});

const generateAlert = (): AlertData | null => {
  const random = Math.random();
  if (random > 0.8) {
    const types: AlertData['type'][] = ['info', 'warning', 'error'];
    const messages = {
      info: ['系统运行正常', '数据采集完成', '备份完成'],
      warning: ['温度偏高', '湿度偏低', '压力波动', '电压不稳定'],
      error: ['传感器离线', '数据异常', '系统过载', '连接失败']
    };

    const type = types[Math.floor(Math.random() * types.length)];
    const message = messages[type][Math.floor(Math.random() * messages[type].length)];

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toISOString()
    };
  }
  return null;
};

// Socket.IO 连接处理
io.on('connection', (socket) => {
  console.log('Client connected');

  // 发送传感器数据
  const sensorInterval = setInterval(() => {
    const sensorData = generateSensorData();
    socket.emit('sensorData', sensorData);
  }, 1000);

  // 发送系统状态
  const systemInterval = setInterval(() => {
    const systemStatus = generateSystemStatus();
    socket.emit('systemStatus', systemStatus);
  }, 2000);

  // 发送告警信息
  const alertInterval = setInterval(() => {
    const alert = generateAlert();
    if (alert) {
      socket.emit('alert', alert);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(sensorInterval);
    clearInterval(systemInterval);
    clearInterval(alertInterval);
  });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 