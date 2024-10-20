import app from './src/app.js';
import { connectDB } from './src/db.js';
import { Server as SocketServer } from 'socket.io';
import http from 'http';

// Conexión a la base de datos
connectDB();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: 'https://www.archived.com.ar', // Cambia esto según tu configuración del frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

// Almacenar los sockets conectados
const connectedSockets = new Map();

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Almacenar el socket.id asociado a un usuario (por ejemplo, userId)
  const userId = socket.handshake.query.userId;
  if (userId) {
    connectedSockets.set(userId, socket.id);
    console.log(`User ID ${userId} asociado con el socket ID ${socket.id}`);
  }

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    connectedSockets.forEach((id, key) => {
      if (id === socket.id) {
        connectedSockets.delete(key);
      }
    });
  });
});

// Función para enviar una señal a un usuario específico
const sendSignalToUser = (userId, signal, data) => {
  const socketId = connectedSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(signal, data);
  }
};

// Configuración del puerto para que se asigne dinámicamente en producción
const PORT = process.env.PORT || 3000;

// Poner el servidor a escuchar en el puerto configurado
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exportar la instancia de io y la función para enviar señales
export { io, sendSignalToUser };
