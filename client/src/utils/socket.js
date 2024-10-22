// utils/socket.js
import io from 'socket.io-client';
import { generateUUID } from './generateUUID'; // Ajusta la ruta según sea necesario

// Verificar si el userId ya existe en localStorage
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = generateUUID(); // Generar un nuevo userId si no existe
  localStorage.setItem('userId', userId); // Guardar el userId en localStorage
}

const socket = io('https://archived-web-1.onrender.com', {
  // web de produccion -> https://archived-web-1.onrender.com
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
  query: {
    userId, // Envía el userId como parte de la consulta
  },
});

socket.on('connect', () => {
  //console.log(`Conectado con id: ${socket.id}`);
});
/*
socket.on('mensaje', (data) => {
  console.log(data);
});*/

export default socket;
