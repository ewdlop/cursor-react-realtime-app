import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import {
  RealtimeChart,
  RealtimeTable,
  StatusIndicator,
  StatsCard,
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
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12, md: 3 }}>
            <StatsCard />
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <StatusIndicator />
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <TrendAnalysis />
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <DataDistribution />
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <DataCounter />
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <DataPrediction />
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <DataComparison />
          </Grid>
          <Grid sx={{ xs: 12, md: 8 }}>
            <RealtimeChart />
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <AlertPanel />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <SensorData />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <SystemStatus />
          </Grid>
          <Grid sx={{ xs: 12 }}>
            <RealtimeTable />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 