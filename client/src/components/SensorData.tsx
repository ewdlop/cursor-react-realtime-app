import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
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

const SensorData: React.FC = () => {
  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    voltage: 0,
    current: 0,
    power: 0,
    timestamp: ''
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setData(newData);
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  const getValueColor = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        return value > 40 ? 'error.main' : value > 30 ? 'warning.main' : 'success.main';
      case 'humidity':
        return value > 80 ? 'error.main' : value < 20 ? 'warning.main' : 'success.main';
      case 'pressure':
        return value > 1000 ? 'error.main' : value < 950 ? 'warning.main' : 'success.main';
      case 'voltage':
        return value > 230 ? 'error.main' : value < 210 ? 'warning.main' : 'success.main';
      case 'current':
        return value > 4 ? 'error.main' : value > 3 ? 'warning.main' : 'success.main';
      case 'power':
        return value > 1000 ? 'error.main' : value > 800 ? 'warning.main' : 'success.main';
      default:
        return 'text.primary';
    }
  };

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        return `${value}°C`;
      case 'humidity':
        return `${value}%`;
      case 'pressure':
        return `${value}hPa`;
      case 'voltage':
        return `${value}V`;
      case 'current':
        return `${value}A`;
      case 'power':
        return `${value}W`;
      default:
        return value.toString();
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        传感器数据
      </Typography>
      <Grid container spacing={2}>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              温度
            </Typography>
            <Typography variant="h6" color={getValueColor(data.temperature, 'temperature')}>
              {formatValue(data.temperature, 'temperature')}
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              湿度
            </Typography>
            <Typography variant="h6" color={getValueColor(data.humidity, 'humidity')}>
              {formatValue(data.humidity, 'humidity')}
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              压力
            </Typography>
            <Typography variant="h6" color={getValueColor(data.pressure, 'pressure')}>
              {formatValue(data.pressure, 'pressure')}
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              电压
            </Typography>
            <Typography variant="h6" color={getValueColor(data.voltage, 'voltage')}>
              {formatValue(data.voltage, 'voltage')}
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              电流
            </Typography>
            <Typography variant="h6" color={getValueColor(data.current, 'current')}>
              {formatValue(data.current, 'current')}
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ xs: 6, md: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              功率
            </Typography>
            <Typography variant="h6" color={getValueColor(data.power, 'power')}>
              {formatValue(data.power, 'power')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        最后更新: {new Date(data.timestamp).toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default SensorData; 