import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
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

interface CounterData {
  total: number;
  high: number;
  low: number;
  average: number;
  type: string;
}

const DataCounter: React.FC = () => {
  const [data, setData] = useState<CounterData>({
    total: 0,
    high: 0,
    low: 0,
    average: 0,
    type: '温度'
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setData(prev => {
        const newTotal = prev.total + 1;
        const newHigh = Math.max(prev.high, newData.temperature);
        const newLow = prev.low === 0 ? newData.temperature : Math.min(prev.low, newData.temperature);
        const newAverage = ((prev.average * prev.total) + newData.temperature) / newTotal;

        return {
          total: newTotal,
          high: newHigh,
          low: newLow,
          average: Number(newAverage.toFixed(2)),
          type: '温度'
        };
      });
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {data.type}数据统计
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            总数据点数
          </Typography>
          <Typography variant="h4">
            {data.total}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            最高{data.type}
          </Typography>
          <Typography variant="h4" color="success.main">
            {data.high.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            最低{data.type}
          </Typography>
          <Typography variant="h4" color="error.main">
            {data.low.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            平均{data.type}
          </Typography>
          <Typography variant="h4" color="info.main">
            {data.average}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DataCounter; 