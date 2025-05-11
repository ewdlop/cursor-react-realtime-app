import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
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

interface TrendData {
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  type: string;
}

const TrendAnalysis: React.FC = () => {
  const [trend, setTrend] = useState<TrendData>({
    current: 0,
    previous: 0,
    change: 0,
    trend: 'stable',
    type: '温度'
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setTrend(prev => {
        const change = newData.temperature - prev.current;
        return {
          current: newData.temperature,
          previous: prev.current,
          change,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
          type: '温度'
        };
      });
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  const getTrendColor = () => {
    switch (trend.trend) {
      case 'up':
        return 'success.main';
      case 'down':
        return 'error.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        趋势分析
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {trend.trend === 'up' ? (
            <TrendingUpIcon color="success" />
          ) : (
            <TrendingDownIcon color="error" />
          )}
          <Typography variant="h4" color={getTrendColor()}>
            {trend.current.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {trend.type}变化趋势
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.abs(trend.change)}
            color={trend.trend === 'up' ? 'success' : 'error'}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {trend.type}较上次变化: {trend.change > 0 ? '+' : ''}{trend.change.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TrendAnalysis; 