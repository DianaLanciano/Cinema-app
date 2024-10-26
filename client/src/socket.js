import { io } from 'socket.io-client';

// Configure Socket.IO to connect to the backend
const socket = io('http://localhost:8000');  // Replace with your backend URL

export default socket;
