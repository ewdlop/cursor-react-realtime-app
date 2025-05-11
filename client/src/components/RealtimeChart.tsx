import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useSocket } from '../contexts/SocketContext';

interface SensorData {
  temperature: number;
  humidity: number;
  pressure: number;
  voltage: number;
  current: number;
  power: number;
  timestamp: string;
}

const RealtimeChart: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [pressureData, setPressureData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setTemperatureData((prev) => [...prev, newData.temperature].slice(-20));
      setHumidityData((prev) => [...prev, newData.humidity].slice(-20));
      setPressureData((prev) => [...prev, newData.pressure].slice(-20));
      setTimestamps((prev) => [...prev, new Date(newData.timestamp).toLocaleTimeString()].slice(-20));
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        实时数据图表
      </Typography>
      <LineChart
        series={[
          {
            data: temperatureData,
            label: '温度',
            area: true,
          },
          {
            data: humidityData,
            label: '湿度',
            area: true,
          },
          {
            data: pressureData,
            label: '压力',
            area: true,
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: timestamps,
          },
        ]}
        height={300}
      />
    </Paper>
  );
};

export default RealtimeChart; 