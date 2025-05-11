import React from 'react';
import { Box, Paper } from '@mui/material';
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
  SystemStatus,
} from './';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* 顶部卡片区域 */}
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <DataCounter />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <StatusIndicator />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <TrendAnalysis />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <DataDistribution />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <DataCounter />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <DataPrediction />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(25% - 12px)' } }}>
        <DataComparison />
      </Box>

      {/* 中间区域 */}
      <Box sx={{ width: { xs: '100%', md: 'calc(66.66% - 12px)' } }}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <RealtimeChart />
        </Paper>
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 12px)' } }}>
        <AlertPanel />
      </Box>

      {/* 底部区域 */}
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
        <SensorData />
      </Box>
      <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
        <SystemStatus />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2 }}>
          <RealtimeTable />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 