'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '@/stores/auth-store';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const token = useAuthStore((state) => state.token);
  const socketRef = useRef(null);
  const reconnectAttempts = useRef(0);

  const createSocket = useCallback(() => {
    // Clean up existing socket
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '') 
      : 'http://localhost:5000';

    console.log('🔌 Creating socket connection to:', API_URL);

    const newSocket = io(API_URL, {
      // DON'T use a namespace - connect to default "/"
      auth: token ? { token } : undefined,
      transports: ['polling', 'websocket'], // Start with polling, upgrade to websocket
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 30000,
      autoConnect: true,
      forceNew: false,
      upgrade: true,
      rememberUpgrade: true,
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected successfully');
      console.log('   Socket ID:', newSocket.id);
      console.log('   Transport:', newSocket.io.engine.transport.name);
      setIsConnected(true);
      setConnectionError(null);
      reconnectAttempts.current = 0;
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      
      if (reason === 'io server disconnect') {
        // Server disconnected us, try reconnecting
        setTimeout(() => {
          newSocket.connect();
        }, 2000);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.warn('Socket connection attempt failed:', error.message);
      setConnectionError(error.message);
      setIsConnected(false);
      reconnectAttempts.current++;
      
      // If too many attempts, stop trying
      if (reconnectAttempts.current > 10) {
        console.error('Max reconnection attempts reached');
        newSocket.disconnect();
      }
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      setIsConnected(true);
      setConnectionError(null);
      reconnectAttempts.current = 0;
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Reconnection attempt:', attemptNumber);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error.message);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('❌ Reconnection failed after all attempts');
      setIsConnected(false);
    });

    // Handle transport upgrade
    newSocket.io.engine.on('upgrade', (transport) => {
      console.log('⬆️ Transport upgraded to:', transport.name);
    });

    newSocket.io.engine.on('upgradeError', (error) => {
      console.warn('Transport upgrade failed:', error.message);
      // Continue with polling
    });

    // Ping/pong for connection health
    newSocket.io.engine.on('ping', () => {
      // Connection is alive
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return newSocket;
  }, [token]);

  useEffect(() => {
    const newSocket = createSocket();

    return () => {
      if (newSocket) {
        console.log('Cleaning up socket connection');
        newSocket.removeAllListeners();
        newSocket.disconnect();
      }
    };
  }, [createSocket]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Browser online - reconnecting socket');
      if (socketRef.current && !socketRef.current.connected) {
        socketRef.current.connect();
      }
    };

    const handleOffline = () => {
      console.log('📴 Browser offline');
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const value = {
    socket,
    isConnected,
    connectionError,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    return { socket: null, isConnected: false, connectionError: 'SocketContext not found' };
  }
  return context;
};