import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Dashboard } from './components';
import { SocketProvider } from './contexts/SocketContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketProvider>
        <Dashboard />
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
