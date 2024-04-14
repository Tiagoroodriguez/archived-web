import app from './src/app.js';
import { connectDB } from './src/db.js';

// Conexión a la base de datos
connectDB();

// Configuración del puerto para que se asigne dinámicamente en producción
const PORT = process.env.PORT || 3000;

// Poner el servidor a escuchar en el puerto configurado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
