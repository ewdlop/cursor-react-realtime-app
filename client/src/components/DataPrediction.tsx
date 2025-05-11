import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useSocket } from '../contexts/SocketContext';

interface PredictionData {
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

const DataPrediction: React.FC = () => {
  const [data, setData] = useState<PredictionData>({
    current: 0,
    predicted: 0,
    confidence: 0,
    trend: 'stable'
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('dataUpdate', (newData: { value: number }) => {
      setData(prev => {
        // 简单的预测算法：基于当前值和历史趋势
        const predicted = newData.value + (newData.value - prev.current) * 0.5;
        const confidence = Math.min(100, Math.max(0, 100 - Math.abs(predicted - newData.value) * 2));
        const trend = predicted > newData.value ? 'up' : predicted < newData.value ? 'down' : 'stable';

        return {
          current: newData.value,
          predicted: Number(predicted.toFixed(2)),
          confidence: Number(confidence.toFixed(1)),
          trend
        };
      });
    });

    return () => {
      socket.off('dataUpdate');
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
        数据预测
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
        <Box>
          <Typography variant="body2" color="text.secondary">
            预测值
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