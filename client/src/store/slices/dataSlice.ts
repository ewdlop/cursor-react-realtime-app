import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SensorData {
  temperature: number;
  humidity: number;
  pressure: number;
  voltage: number;
  current: number;
  power: number;
  timestamp: number;
}

interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  timestamp: number;
}

interface AlertData {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

interface DataState {
  sensorData: SensorData[];
  systemStatus: SystemStatus[];
  alerts: AlertData[];
  maxDataPoints: number;
}

const initialState: DataState = {
  sensorData: [],
  systemStatus: [],
  alerts: [],
  maxDataPoints: 100, // 最多保存100个数据点
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addSensorData: (state, action: PayloadAction<SensorData>) => {
      state.sensorData.push(action.payload);
      if (state.sensorData.length > state.maxDataPoints) {
        state.sensorData.shift();
      }
    },
    addSystemStatus: (state, action: PayloadAction<SystemStatus>) => {
      state.systemStatus.push(action.payload);
      if (state.systemStatus.length > state.maxDataPoints) {
        state.systemStatus.shift();
      }
    },
    addAlert: (state, action: PayloadAction<AlertData>) => {
      state.alerts.push(action.payload);
      if (state.alerts.length > state.maxDataPoints) {
        state.alerts.shift();
      }
    },
    clearData: (state) => {
      state.sensorData = [];
      state.systemStatus = [];
      state.alerts = [];
    },
    setMaxDataPoints: (state, action: PayloadAction<number>) => {
      state.maxDataPoints = action.payload;
      // 如果当前数据点超过新的最大值，删除旧的数据
      if (state.sensorData.length > state.maxDataPoints) {
        state.sensorData = state.sensorData.slice(-state.maxDataPoints);
      }
      if (state.systemStatus.length > state.maxDataPoints) {
        state.systemStatus = state.systemStatus.slice(-state.maxDataPoints);
      }
      if (state.alerts.length > state.maxDataPoints) {
        state.alerts = state.alerts.slice(-state.maxDataPoints);
      }
    },
  },
});

export const {
  addSensorData,
  addSystemStatus,
  addAlert,
  clearData,
  setMaxDataPoints,
} = dataSlice.actions;

export default dataSlice.reducer; 