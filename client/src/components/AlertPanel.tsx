import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useSocket } from '../contexts/SocketContext';

interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'error' | 'info';
  timestamp: string;
}

const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const socket = useSocket();

  useEffect(() => {
    console.log('AlertPanel: Setting up socket listener');
    
    const handleAlert = (newAlert: Alert) => {
      console.log('AlertPanel: Received new alert:', newAlert);
      setAlerts(prev => {
        const updated = [newAlert, ...prev].slice(0, 5);
        console.log('AlertPanel: Updated alerts:', updated);
        return updated;
      });
    };

    socket.on('alert', handleAlert);
    console.log('AlertPanel: Socket listener set up');

    return () => {
      console.log('AlertPanel: Cleaning up socket listener');
      socket.off('alert', handleAlert);
    };
  }, [socket]);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'info':
        return <InfoIcon color="info" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      case 'info':
        return 'info.main';
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        实时告警
      </Typography>
      {alerts.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          暂无告警信息
        </Typography>
      ) : (
        <List>
          {alerts.map((alert) => (
            <ListItem key={alert.id} sx={{ borderLeft: `4px solid ${getAlertColor(alert.type)}` }}>
              <ListItemIcon>
                {getAlertIcon(alert.type)}
              </ListItemIcon>
              <ListItemText
                primary={alert.message}
                secondary={new Date(alert.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AlertPanel; 