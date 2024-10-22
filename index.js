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

const connectedSockets = new Map();
let socketId; // Define socketId

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`Cliente conectado: ${userId}`);
  connectedSockets.set(userId, socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    connectedSockets.delete(userId);
  });

  socketId = socket.id; // Asigna socketId cuando un cliente se conecta
});

// Función para enviar una señal a un usuario específico
const sendSocketIdToClient = (userId) => {
  const socketId = connectedSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit('mensaje', userId);
    console.log(
      `Emitiendo mensaje a usuario ${userId} con socketId ${socketId}`
    );
  } else {
    console.log(`No se encontró socketId para el usuario ${userId}`);
  }
};

// Configuración del puerto para que se asigne dinámicamente en producción
const PORT = process.env.PORT || 3000;

// Poner el servidor a escuchar en el puerto configurado
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io, sendSocketIdToClient }; // Exporta io y socketId

export default io;
