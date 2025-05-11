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

interface PredictionData {
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  type: string;
}

const DataPrediction: React.FC = () => {
  const [data, setData] = useState<PredictionData>({
    current: 0,
    predicted: 0,
    confidence: 0,
    trend: 'stable',
    type: '温度'
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setData(prev => {
        // 简单的预测算法：基于当前值和历史趋势
        const predicted = newData.temperature + (newData.temperature - prev.current) * 0.5;
        const confidence = Math.min(100, Math.max(0, 100 - Math.abs(predicted - newData.temperature) * 2));
        const trend = predicted > newData.temperature ? 'up' : predicted < newData.temperature ? 'down' : 'stable';

        return {
          current: newData.temperature,
          predicted: Number(predicted.toFixed(2)),
          confidence: Number(confidence.toFixed(1)),
          trend,
          type: '温度'
        };
      });
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  const getTrendColor = () => {
    switch (data.trend) {
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
        {data.type}数据预测
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            当前{data.type}
          </Typography>
          <Typography variant="h4">
            {data.current.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            预测{data.type}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {data.trend === 'up' ? (
              <TrendingUpIcon color="success" />
            ) : (
              <TrendingDownIcon color="error" />
            )}
            <Typography variant="h4" color={getTrendColor()}>
              {data.predicted}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            预测置信度
          </Typography>
          <LinearProgress
            variant="determinate"
            value={data.confidence}
            color={data.confidence > 70 ? 'success' : data.confidence > 40 ? 'warning' : 'error'}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {data.confidence}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DataPrediction; 