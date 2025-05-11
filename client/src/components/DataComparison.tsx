import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { useSocket } from '../contexts/SocketContext';

interface ComparisonData {
  current: number;
  previous: number;
  change: number;
  percentage: number;
  period: string;
}

const DataComparison: React.FC = () => {
  const [data, setData] = useState<ComparisonData>({
    current: 0,
    previous: 0,
    change: 0,
    percentage: 0,
    period: '1分钟'
  });
  const socket = useSocket();

  useEffect(() => {
    let previousValue = 0;
    let lastUpdateTime = Date.now();

    socket.on('dataUpdate', (newData: { value: number }) => {
      const now = Date.now();
      const timeDiff = now - lastUpdateTime;
      
      setData(prev => {
        const change = newData.value - previousValue;
        const percentage = previousValue === 0 ? 0 : (change / previousValue) * 100;
        
        previousValue = newData.value;
        lastUpdateTime = now;

        return {
          current: newData.value,
          previous: prev.current,
          change: Number(change.toFixed(2)),
          percentage: Number(percentage.toFixed(2)),
          period: timeDiff < 60000 ? '1分钟' : '5分钟'
        };
      });
    });

    return () => {
      socket.off('dataUpdate');
    };
  }, [socket]);

  const getChangeColor = (value: number) => {
    if (value > 0) return 'success.main';
    if (value < 0) return 'error.main';
    return 'text.primary';
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        数据比较
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            当前值
          </Typography>
          <Typography variant="h4">
            {data.current.toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body2" color="text.secondary">
            较{data.period}前
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h4" color={getChangeColor(data.change)}>
              {data.change > 0 ? '+' : ''}{data.change}
            </Typography>
            <Typography variant="body1" color={getChangeColor(data.percentage)}>
              ({data.percentage > 0 ? '+' : ''}{data.percentage}%)
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            上期值
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {data.previous.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DataComparison; 