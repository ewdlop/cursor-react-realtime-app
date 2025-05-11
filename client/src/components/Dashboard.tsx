import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import {
  RealtimeChart,
  RealtimeTable,
  StatusIndicator,
  DataDistribution,
  AlertPanel,
  TrendAnalysis,
  DataCounter,
  DataPrediction,
  DataComparison,
  SensorData,
  SystemStatus
} from './';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          实时数据仪表板
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: 'calc(25% - 9px)' } }}>
            <DataCounter />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(25% - 9px)' } }}>
            <StatusIndicator />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(25% - 9px)' } }}>
            <TrendAnalysis />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(25% - 9px)' } }}>
            <DataDistribution />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 8px)' } }}>
            <DataCounter />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 8px)' } }}>
            <DataPrediction />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 8px)' } }}>
            <DataComparison />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(66.66% - 6px)' } }}>
            <RealtimeChart />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 6px)' } }}>
            <AlertPanel />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 6px)' } }}>
            <SensorData />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 6px)' } }}>
            <SystemStatus />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RealtimeTable />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard; 