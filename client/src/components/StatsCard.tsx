import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import io from 'socket.io-client';

interface Stats {
  current: number;
  previous: number;
  change: number;
}

const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    current: 0,
    previous: 0,
    change: 0,
  });

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('dataUpdate', (newData: { value: number }) => {
      setStats((prev) => ({
        current: newData.value,
        previous: prev.current,
        change: newData.value - prev.current,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const isPositive = stats.change >= 0;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        数据统计
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4">
          {stats.current.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isPositive ? (
            <TrendingUpIcon color="success" />
          ) : (
            <TrendingDownIcon color="error" />
          )}
          <Typography
            color={isPositive ? 'success.main' : 'error.main'}
            variant="body2"
          >
            {isPositive ? '+' : ''}{stats.change.toFixed(2)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          较上次更新
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard; 