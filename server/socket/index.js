import socketIo from 'socket.io';
import { subscriber } from '../pubsub/index.js';

function setupSocket(server) {
  const io = socketIo(server); // creates a new Socket.IO instance attached to the server, which allows WebSocket connections.

  io.on('connection', (socket) => { //  listens for new client connections. When a client connects, the server logs the client's unique socket.id.
    console.log("New client connected:", socket.id);

    // Listen for booking events and emit updates
    subscriber.subscribe('seatUpdates'); // subscribes the Redis client to a seatUpdates channel where updates related to seat reservations are published.
    subscriber.on('message', (channel, message) => { // listens for new messages on the channel.
      if (channel === 'seatUpdates') {
        /* If a message is received on the seatUpdates channel,
         this will broadcasts it to all connected clients 
         as a seatUpdate event, 
         allowing clients to react in real time. */
        io.emit('seatUpdate', JSON.parse(message));
      }
    });

    socket.on('disconnect', () => console.log("Client disconnected")); // listener for when a client disconnects, logging "Client disconnected."
  });

  return io;
}

module.exports = { setupSocket };
