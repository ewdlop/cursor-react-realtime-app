import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { LineChart } from '@mui/x-charts/LineChart';
import io from 'socket.io-client';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledPaper = styled(Paper)`
  padding: 20px;
  height: 100%;
  min-height: 300px;
`;

interface DataPoint {
  timestamp: string;
  value: number;
  category: string;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('dataUpdate', (newData: DataPoint) => {
      setData(prevData => {
        const updatedData = [...prevData, newData];
        if (updatedData.length > 20) {
          return updatedData.slice(-20);
        }
        return updatedData;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 处理 x 轴和 y 轴数据
  const xLabels = data.map(d => d.timestamp.slice(11, 19)); // 只显示时分秒
  const yValues = data.map(d => d.value);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          实时数据仪表板
        </Typography>
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12 }}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                实时数据图表
              </Typography>
              <LineChart
                height={400}
                series={[{ data: yValues, label: '实时数值' }]}
                xAxis={[{ scaleType: 'point', data: xLabels, label: '时间' }]}
                yAxis={[{ label: '数值' }]}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </StyledPaper>
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                最新数据
              </Typography>
              {data.length > 0 && (
                <div>
                  <Typography>时间: {data[data.length - 1].timestamp}</Typography>
                  <Typography>数值: {data[data.length - 1].value.toFixed(2)}</Typography>
                  <Typography>类别: {data[data.length - 1].category}</Typography>
                </div>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
