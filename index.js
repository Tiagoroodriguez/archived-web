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

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Configuración del puerto para que se asigne dinámicamente en producción
const PORT = process.env.PORT || 3000;

// Poner el servidor a escuchar en el puerto configurado
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default io;
