import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch } from '../store/hooks';
import { addSensorData, addSystemStatus, addAlert } from '../store/slices/dataSlice';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context.socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

export const useSocketStatus = () => {
  const context = useContext(SocketContext);
  return context.isConnected;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socketInstance = io('http://localhost:3001');

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('sensorData', (data) => {
      dispatch(addSensorData({
        ...data,
        timestamp: Date.now(),
      }));
    });

    socketInstance.on('systemStatus', (data) => {
      dispatch(addSystemStatus({
        ...data,
        timestamp: Date.now(),
      }));
    });

    socketInstance.on('alert', (data) => {
      dispatch(addAlert({
        ...data,
        timestamp: Date.now(),
      }));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}; 