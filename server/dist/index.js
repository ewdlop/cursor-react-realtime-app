"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 生成随机数据
const generateSensorData = () => ({
    temperature: Number((20 + Math.random() * 30).toFixed(2)),
    humidity: Number((30 + Math.random() * 50).toFixed(2)),
    pressure: Number((980 + Math.random() * 40).toFixed(2)),
    voltage: Number((220 + Math.random() * 10).toFixed(2)),
    current: Number((1 + Math.random() * 5).toFixed(2)),
    power: Number((220 + Math.random() * 1000).toFixed(2)),
    timestamp: new Date().toISOString()
});
const generateSystemStatus = () => ({
    cpu: Number((Math.random() * 100).toFixed(2)),
    memory: Number((Math.random() * 100).toFixed(2)),
    disk: Number((Math.random() * 100).toFixed(2)),
    network: {
        upload: Number((Math.random() * 100).toFixed(2)),
        download: Number((Math.random() * 100).toFixed(2))
    },
    timestamp: new Date().toISOString()
});
const generateAlert = () => {
    const random = Math.random();
    if (random > 0.8) {
        const levels = ['info', 'warning', 'error'];
        const sources = ['温度传感器', '湿度传感器', '压力传感器', '电压传感器', '系统'];
        const messages = {
            info: ['系统运行正常', '数据采集完成', '备份完成'],
            warning: ['温度偏高', '湿度偏低', '压力波动', '电压不稳定'],
            error: ['传感器离线', '数据异常', '系统过载', '连接失败']
        };
        const level = levels[Math.floor(Math.random() * levels.length)];
        const source = sources[Math.floor(Math.random() * sources.length)];
        const message = messages[level][Math.floor(Math.random() * messages[level].length)];
        return {
            level,
            message,
            source,
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
