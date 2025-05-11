import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { SocketProvider } from './contexts/SocketContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RealtimeChart from './components/RealtimeChart';
import RealtimeTable from './components/RealtimeTable';
import AlertPanel from './components/AlertPanel';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - 64px)` },
                ml: '64px',
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chart" element={<RealtimeChart />} />
                <Route path="/table" element={<RealtimeTable />} />
                <Route path="/alerts" element={<AlertPanel />} />
                <Route path="/settings" element={<div>设置页面</div>} />
                <Route path="/about" element={<div>关于页面</div>} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
