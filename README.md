# 实时数据仪表板应用

这是一个使用现代技术栈构建的实时数据仪表板应用，支持实时数据更新和可视化展示。

## 技术栈

- 前端：
  - React
  - TypeScript
  - Material-UI
  - Socket.IO Client
  - @mui/x-charts

- 后端：
  - Node.js
  - Express
  - Socket.IO
  - TypeScript

## 功能特点

- 实时数据更新
- 响应式设计
- 暗色主题界面
- 实时数据图表展示
- 最新数据状态显示

## 安装说明

### 前置要求

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装后端依赖
```bash
cd server
npm install
```

3. 安装前端依赖
```bash
cd ../client
npm install
```

## 运行应用

1. 启动后端服务器
```bash
cd server
npm run dev
```
服务器将在 http://localhost:5001 运行

2. 启动前端应用
```bash
cd client
npm start
```
前端应用将在 http://localhost:3000 运行

## 项目结构

```
├── client/                 # 前端项目目录
│   ├── src/               # 源代码
│   ├── public/            # 静态资源
│   └── package.json       # 前端依赖配置
│
└── server/                # 后端项目目录
    ├── src/              # 源代码
    └── package.json      # 后端依赖配置
```

## 使用说明

1. 打开浏览器访问 http://localhost:3000
2. 仪表板将自动开始接收和显示实时数据
3. 图表将每秒钟更新一次
4. 最新数据面板会显示最近接收到的数据点

## 开发说明

- 后端使用 Socket.IO 每秒生成一次随机数据
- 前端使用 Material-UI 的图表组件展示数据
- 数据保留最近 20 个数据点
- 支持实时数据更新和自动清理

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

MIT 