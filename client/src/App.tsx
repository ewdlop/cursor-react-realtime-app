import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import {
  Sidebar,
  Dashboard,
  RealtimeChart,
  RealtimeTable,
  AlertPanel,
} from './components';
import { SocketProvider } from './contexts/SocketContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
                  <Route path="/analysis" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </SocketProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
