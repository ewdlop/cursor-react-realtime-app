# 实时数据仪表板 / Real-time Data Dashboard

一个使用 React、TypeScript、Socket.IO 和 Material-UI 构建的实时数据仪表板应用。

A real-time data dashboard application built with React, TypeScript, Socket.IO, and Material-UI.

## 功能特点 / Features

- 实时数据更新 / Real-time data updates
- 响应式设计 / Responsive design
- 多种数据可视化组件 / Multiple data visualization components
- 实时告警系统 / Real-time alert system
- 数据趋势分析 / Data trend analysis
- 数据分布统计 / Data distribution statistics

## 技术栈 / Tech Stack

- 前端 / Frontend:
  - React 18
  - TypeScript
  - Material-UI
  - Socket.IO Client
  - @mui/x-charts

- 后端 / Backend:
  - Node.js
  - Express
  - Socket.IO
  - TypeScript

## 组件说明 / Components

1. 实时图表 / RealtimeChart
   - 使用折线图显示实时数据变化
   - 支持数据缩放和平移
   - 自动更新数据点

2. 实时表格 / RealtimeTable
   - 显示最新的数据记录
   - 支持数据排序
   - 自动更新最新数据

3. 状态指示器 / StatusIndicator
   - 显示系统当前状态
   - 实时更新状态变化
   - 使用不同颜色标识状态

4. 统计卡片 / StatsCard
   - 显示关键统计数据
   - 实时更新数值
   - 支持自定义指标

5. 数据分布 / DataDistribution
   - 使用饼图显示数据分布
   - 支持交互式高亮
   - 实时更新分布情况

6. 告警面板 / AlertPanel
   - 显示实时告警信息
   - 支持多级告警
   - 自动更新告警状态

7. 趋势分析 / TrendAnalysis
   - 显示数据变化趋势
   - 计算变化率
   - 可视化趋势方向

## 安装说明 / Installation

1. 克隆仓库 / Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. 安装依赖 / Install dependencies:
```bash
# 安装后端依赖 / Install backend dependencies
cd server
npm install

# 安装前端依赖 / Install frontend dependencies
cd ../client
npm install
```

3. 启动应用 / Start the application:
```bash
# 启动后端服务 / Start backend server
cd server
npm run dev

# 启动前端服务 / Start frontend server
cd ../client
npm start
```

## 环境要求 / Requirements

- Node.js >= 14
- npm >= 6
- 现代浏览器 / Modern web browser

## 开发说明 / Development

- 后端服务运行在 5001 端口 / Backend server runs on port 5001
- 前端开发服务器运行在 3000 端口 / Frontend dev server runs on port 3000
- 使用 Socket.IO 进行实时通信 / Uses Socket.IO for real-time communication
- 支持热重载 / Supports hot reloading

## 项目结构 / Project Structure

```
├── client/                 # 前端代码 / Frontend code
│   ├── src/
│   │   ├── components/    # React 组件 / React components
│   │   ├── contexts/      # React 上下文 / React contexts
│   │   └── App.tsx        # 主应用组件 / Main app component
│   └── package.json
│
└── server/                 # 后端代码 / Backend code
    ├── src/
    │   ├── routes/        # API 路由 / API routes
    │   ├── services/      # 业务逻辑 / Business logic
    │   └── index.ts       # 服务器入口 / Server entry
    └── package.json
```

## 贡献指南 / Contributing

1. Fork 项目 / Fork the project
2. 创建特性分支 / Create your feature branch
3. 提交更改 / Commit your changes
4. 推送到分支 / Push to the branch
5. 创建 Pull Request / Create a Pull Request

## 许可证 / License

MIT 