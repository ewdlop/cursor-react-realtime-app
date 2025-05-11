import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:5001');
const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
); 