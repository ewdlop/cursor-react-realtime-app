import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Alert } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useSocket } from '../contexts/SocketContext';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('dataUpdate', (newData: { value: number }) => {
      if (newData.value > 80) {
        setAlerts(prev => [{
          id: Date.now().toString(),
          type: 'error' as const,
          message: `数值过高: ${newData.value}`,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 5));
      } else if (newData.value > 60) {
        setAlerts(prev => [{
          id: Date.now().toString(),
          type: 'warning' as const,
          message: `数值偏高: ${newData.value}`,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 5));
      }
    });

    return () => {
      socket.off('dataUpdate');
    };
  }, [socket]);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        实时告警
      </Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.id}>
            <ListItemIcon>
              {getAlertIcon(alert.type)}
            </ListItemIcon>
            <ListItemText
              primary={alert.message}
              secondary={alert.timestamp}
            />
          </ListItem>
        ))}
        {alerts.length === 0 && (
          <Alert severity="info">暂无告警</Alert>
        )}
      </List>
    </Paper>
  );
};

export default AlertPanel; 