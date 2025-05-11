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
  DataComparison
} from './';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          实时数据仪表板
        </Typography>
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <StatsCard />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <StatusIndicator />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <TrendAnalysis />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <DataDistribution />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <DataCounter />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <DataPrediction />
          </Grid>
          <Grid sx={{ xs: 12, md: 6, lg: 3 }}>
            <DataComparison />
          </Grid>
          <Grid sx={{ xs: 12, lg: 8 }}>
            <RealtimeChart />
          </Grid>
          <Grid sx={{ xs: 12, lg: 4 }}>
            <AlertPanel />
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