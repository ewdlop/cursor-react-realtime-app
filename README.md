# 实时数据监控系统 / Real-time Data Monitoring System

这是一个基于 React 和 Socket.IO 的实时数据监控系统，用于展示和分析传感器数据。
A real-time data monitoring system built with React and Socket.IO for displaying and analyzing sensor data.

## 功能特点 / Features

### 实时数据展示 / Real-time Data Display
- 传感器数据实时更新（温度、湿度、压力、电压、电流、功率）
  Real-time sensor data updates (temperature, humidity, pressure, voltage, current, power)
- 系统状态监控（CPU、内存、磁盘、网络使用情况）
  System status monitoring (CPU, memory, disk, network usage)
- 实时告警系统
  Real-time alert system

### 数据可视化组件 / Data Visualization Components
1. **数据统计 (DataCounter)**
   - 显示总数据点数 / Display total data points
   - 最高/最低值记录 / Record highest/lowest values
   - 平均值计算 / Calculate average values
   - 实时更新 / Real-time updates

2. **趋势分析 (TrendAnalysis)**
   - 实时数据变化趋势 / Real-time data trend analysis
   - 变化方向指示（上升/下降）/ Change direction indication (up/down)
   - 变化幅度可视化 / Change magnitude visualization
   - 趋势图表展示 / Trend chart display

3. **数据预测 (DataPrediction)**
   - 基于历史数据的预测值 / Predictions based on historical data
   - 预测置信度显示 / Prediction confidence display
   - 趋势方向指示 / Trend direction indication
   - 实时更新预测结果 / Real-time prediction updates

4. **数据比较 (DataComparison)**
   - 当前值与历史值比较 / Current vs historical value comparison
   - 变化百分比计算 / Change percentage calculation
   - 时间周期自适应 / Adaptive time periods
   - 变化趋势可视化 / Change trend visualization

5. **告警面板 (AlertPanel)**
   - 实时告警信息展示 / Real-time alert information display
   - 告警级别分类（信息、警告、错误）/ Alert level classification (info, warning, error)
   - 告警时间记录 / Alert timestamp recording
   - 最多显示5条最新告警 / Display up to 5 latest alerts

6. **系统状态 (SystemStatus)**
   - CPU 使用率监控 / CPU usage monitoring
   - 内存使用情况 / Memory usage monitoring
   - 磁盘空间状态 / Disk space status
   - 网络流量统计 / Network traffic statistics

7. **传感器数据 (SensorData)**
   - 多类型传感器数据展示 / Multi-type sensor data display
   - 实时数据更新 / Real-time data updates
   - 数据可视化展示 / Data visualization
   - 阈值监控 / Threshold monitoring

## 技术栈 / Tech Stack

### 前端 / Frontend
- React 18
- TypeScript
- Material-UI
- Socket.IO Client
- React Context API

### 后端 / Backend
- Node.js
- Express
- Socket.IO
- TypeScript

## 安装和运行 / Installation and Running

1. 克隆仓库 / Clone the repository
```bash
git clone [repository-url]
```

2. 安装依赖 / Install dependencies
```bash
# 安装后端依赖 / Install backend dependencies
cd server
npm install

# 安装前端依赖 / Install frontend dependencies
cd ../client
npm install
```

3. 启动服务 / Start services
```bash
# 启动后端服务 / Start backend server
cd server
npm run dev

# 启动前端服务 / Start frontend server
cd ../client
npm start
```

## 数据更新频率 / Data Update Frequency

- 传感器数据：每秒更新 / Sensor data: Updates every second
- 系统状态：每2秒更新 / System status: Updates every 2 seconds
- 告警信息：每5秒检查（20%概率生成新告警）/ Alerts: Checks every 5 seconds (20% chance of new alert)

## 开发说明 / Development Notes

### 组件结构 / Component Structure
所有组件都通过 `SocketContext` 共享 Socket.IO 连接，确保实时数据的统一管理。
All components share Socket.IO connection through `SocketContext` for unified real-time data management.

### 数据流 / Data Flow
1. 服务器生成模拟数据 / Server generates mock data
2. 通过 Socket.IO 发送到客户端 / Sends to client via Socket.IO
3. 组件通过 `useSocket` hook 接收数据 / Components receive data via `useSocket` hook
4. 数据更新触发组件重新渲染 / Data updates trigger component re-rendering

### 告警系统 / Alert System
- 支持三种告警级别：info、warning、error / Supports three alert levels: info, warning, error
- 告警信息包含：ID、类型、消息、时间戳 / Alert information includes: ID, type, message, timestamp
- 自动清理过期告警 / Automatic cleanup of expired alerts
- 最多保留5条最新告警 / Keeps up to 5 latest alerts

## 贡献指南 / Contributing

1. Fork 项目 / Fork the project
2. 创建特性分支 / Create feature branch
3. 提交更改 / Commit changes
4. 推送到分支 / Push to branch
5. 创建 Pull Request / Create Pull Request

## 许可证 / License

MIT License

## 项目结构 / Project Structure

```
├── client/                 # 前端代码 / Frontend code
│   ├── src/
│   │   ├── components/    # React 组件 / React components
│   │   │   ├── AlertPanel.tsx
│   │   │   ├── DataComparison.tsx
│   │   │   ├── DataCounter.tsx
│   │   │   ├── DataDistribution.tsx
│   │   │   ├── DataPrediction.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RealtimeChart.tsx
│   │   │   ├── RealtimeTable.tsx
│   │   │   ├── SensorData.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   ├── SystemStatus.tsx
│   │   │   └── TrendAnalysis.tsx
│   │   ├── contexts/      # React 上下文 / React contexts
│   │   │   └── SocketContext.tsx
│   │   ├── theme.ts       # Material-UI 主题配置 / Material-UI theme configuration
│   │   └── App.tsx        # 主应用组件 / Main app component
│   └── package.json
│
└── server/                 # 后端代码 / Backend code
    ├── src/
    │   ├── index.ts       # 服务器入口 / Server entry
    │   └── types/         # TypeScript 类型定义 / TypeScript type definitions
    └── package.json
```

### 目录说明 / Directory Description

#### 前端 / Frontend
- `components/`: 包含所有 React 组件
  - `AlertPanel.tsx`: 告警面板组件
  - `DataComparison.tsx`: 数据比较组件
  - `DataCounter.tsx`: 数据统计组件
  - `DataDistribution.tsx`: 数据分布组件
  - `DataPrediction.tsx`: 数据预测组件
  - `Dashboard.tsx`: 主仪表板组件
  - `RealtimeChart.tsx`: 实时图表组件
  - `RealtimeTable.tsx`: 实时表格组件
  - `SensorData.tsx`: 传感器数据组件
  - `StatusIndicator.tsx`: 状态指示器组件
  - `SystemStatus.tsx`: 系统状态组件
  - `TrendAnalysis.tsx`: 趋势分析组件
- `contexts/`: 包含 React Context 定义
  - `SocketContext.tsx`: Socket.IO 连接上下文
- `theme.ts`: Material-UI 主题配置
- `App.tsx`: 应用程序入口组件

#### 后端 / Backend
- `index.ts`: 服务器入口文件，包含 Socket.IO 服务器配置和数据生成逻辑
- `types/`: TypeScript 类型定义文件

[... 保持其他内容不变 ...] 