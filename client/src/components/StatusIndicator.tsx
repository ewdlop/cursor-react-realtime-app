import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import io from 'socket.io-client';

const StatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('connect', () => {
      setStatus('online');
    });

    socket.on('disconnect', () => {
      setStatus('offline');
    });

    socket.on('dataUpdate', () => {
      setLastUpdate(new Date().toLocaleTimeString());
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        系统状态
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress
          size={20}
          color={status === 'online' ? 'success' : 'error'}
        />
        <Typography>
          状态: {status === 'online' ? '在线' : '离线'}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        最后更新: {lastUpdate || '暂无数据'}
      </Typography>
    </Paper>
  );
};

export default StatusIndicator; 