import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Grid, LinearProgress } from '@mui/material';
import { useSocket } from '../contexts/SocketContext';

interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    upload: number;
    download: number;
  };
  timestamp: string;
}

const SystemStatus: React.FC = () => {
  const [data, setData] = useState<SystemStatus>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: {
      upload: 0,
      download: 0
    },
    timestamp: ''
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on('systemStatus', (newData: SystemStatus) => {
      setData(newData);
    });

    return () => {
      socket.off('systemStatus');
    };
  }, [socket]);

  const getProgressColor = (value: number) => {
    if (value > 90) return 'error';
    if (value > 70) return 'warning';
    return 'success';
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        系统状态
      </Typography>
      <Grid container spacing={2}>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              CPU 使用率
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.cpu}
                  color={getProgressColor(data.cpu)}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(data.cpu)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              内存使用率
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.memory}
                  color={getProgressColor(data.memory)}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(data.memory)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              磁盘使用率
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.disk}
                  color={getProgressColor(data.disk)}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(data.disk)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              网络使用率
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(data.network.upload + data.network.download) / 2}
                  color={getProgressColor((data.network.upload + data.network.download) / 2)}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round((data.network.upload + data.network.download) / 2)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        最后更新: {new Date(data.timestamp).toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default SystemStatus; 