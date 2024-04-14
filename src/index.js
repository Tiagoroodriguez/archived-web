import app from './app.js';
import { connectDB } from './db.js';

// Conexión a la base de datos
connectDB();

// Configuración del puerto para que se asigne dinámicamente en producción
const port = process.env.PORT || 3000;

// Poner el servidor a escuchar en el puerto configurado
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
