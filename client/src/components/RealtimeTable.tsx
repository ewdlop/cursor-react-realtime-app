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
import io from 'socket.io-client';

interface DataPoint {
  timestamp: string;
  value: number;
  status: string;
}

const RealtimeTable: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('dataUpdate', (newData: { value: number }) => {
      setData((prevData) => {
        const newDataPoint: DataPoint = {
          timestamp: new Date().toLocaleTimeString(),
          value: newData.value,
          status: newData.value > 50 ? '高' : '低',
        };
        return [newDataPoint, ...prevData].slice(0, 10);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
              <TableCell align="right">数值</TableCell>
              <TableCell align="right">状态</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RealtimeTable; 