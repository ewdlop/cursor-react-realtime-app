import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
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

interface DistributionData {
  category: string;
  value: number;
}

const DataDistribution: React.FC = () => {
  const [data, setData] = useState<DistributionData[]>([
    { category: '温度', value: 0 },
    { category: '湿度', value: 0 },
    { category: '压力', value: 0 },
    { category: '电压', value: 0 },
    { category: '电流', value: 0 },
    { category: '功率', value: 0 }
  ]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setData([
        { category: '温度', value: newData.temperature },
        { category: '湿度', value: newData.humidity },
        { category: '压力', value: newData.pressure },
        { category: '电压', value: newData.voltage },
        { category: '电流', value: newData.current },
        { category: '功率', value: newData.power }
      ]);
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        数据分布
      </Typography>
      <PieChart
        series={[
          {
            data: data.map(item => ({
              id: item.category,
              value: item.value,
              label: item.category,
            })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        height={300}
      />
    </Paper>
  );
};

export default DataDistribution; 