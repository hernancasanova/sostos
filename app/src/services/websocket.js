import io from 'socket.io-client';
import { URL_WEBSOCKET } from '../configs/configs';

export const createWebSocketConnection = () => {
  let socket;
  const token = localStorage.getItem('token');
  if (token) {
    socket = io.connect(URL_WEBSOCKET, {
      query: {
        token
      }
    });
  }
  return socket;
};
