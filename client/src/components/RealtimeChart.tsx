import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import io from 'socket.io-client';

const RealtimeChart: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('dataUpdate', (newData: { value: number }) => {
      setData((prevData) => [...prevData, newData.value].slice(-20));
      setTimestamps((prevTimestamps) => 
        [...prevTimestamps, new Date().toLocaleTimeString()].slice(-20)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        实时数据图表
      </Typography>
      <LineChart
        series={[
          {
            data: data,
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