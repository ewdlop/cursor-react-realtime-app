import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useSocket } from '../contexts/SocketContext';

interface DistributionData {
  category: string;
  value: number;
}

const DataDistribution: React.FC = () => {
  const [data, setData] = useState<DistributionData[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('dataUpdate', (newData: { value: number }) => {
      setData((prevData) => {
        const category = newData.value > 50 ? '高' : '低';
        const existingCategory = prevData.find(d => d.category === category);
        
        if (existingCategory) {
          return prevData.map(d => 
            d.category === category 
              ? { ...d, value: d.value + 1 }
              : d
          );
        }
        
        return [...prevData, { category, value: 1 }];
      });
    });

    return () => {
      socket.off('dataUpdate');
    };
  }, [socket]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        数据分布
      </Typography>
      <PieChart
        series={[
          {
            data: data.map(item => ({
              id: item.category,
              value: item.value,
              label: item.category,
            })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        height={300}
      />
    </Paper>
  );
};

export default DataDistribution; 