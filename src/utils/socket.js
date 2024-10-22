/*// utils/socket.js
const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Ajusta esto según la configuración de tu frontend
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });

    socket.on('mensaje', (data) => {
      console.log(`Mensaje recibido del cliente: ${data}`);
    });

    // Agrega otros eventos aquí
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado');
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
*/
