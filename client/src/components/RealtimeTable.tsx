import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
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

const RealtimeTable: React.FC = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('sensorData', (newData: SensorData) => {
      setData((prevData) => [newData, ...prevData].slice(0, 10));
    });

    return () => {
      socket.off('sensorData');
    };
  }, [socket]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        实时数据表格
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>时间</TableCell>
              <TableCell align="right">温度 (°C)</TableCell>
              <TableCell align="right">湿度 (%)</TableCell>
              <TableCell align="right">压力 (hPa)</TableCell>
              <TableCell align="right">电压 (V)</TableCell>
              <TableCell align="right">电流 (A)</TableCell>
              <TableCell align="right">功率 (W)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(row.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell align="right">{row.temperature.toFixed(2)}</TableCell>
                <TableCell align="right">{row.humidity.toFixed(2)}</TableCell>
                <TableCell align="right">{row.pressure.toFixed(2)}</TableCell>
                <TableCell align="right">{row.voltage.toFixed(2)}</TableCell>
                <TableCell align="right">{row.current.toFixed(2)}</TableCell>
                <TableCell align="right">{row.power.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RealtimeTable; 