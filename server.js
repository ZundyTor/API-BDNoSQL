// Importamos las dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuramos las variables de entorno
dotenv.config();

// Creamos la aplicación Express
const app = express();

// Configuramos el puerto (desde .env o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES (funciones intermedias)
// ==========================================

// Permite que la API reciba y envíe JSON
app.use(express.json());

// Permite que otras aplicaciones consuman tu API
app.use(cors());

// ==========================================
// RUTAS (endpoints de tu API)
// ==========================================

// Ruta de bienvenida (GET http://localhost:3000/)
app.get('/', (req, res) => {
  res.json({
    message: '🌍 Bienvenido a la API de Países',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1'
    }
  });
});

// Ruta para verificar que la API está funcionando
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'La API está funcionando correctamente'
  });
});

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.url
  });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 Servidor iniciado correctamente   ║
╚════════════════════════════════════════╝
  
  📡 Puerto: ${PORT}
  🌐 URL: http://localhost:${PORT}
  📚 Documentación: http://localhost:${PORT}/
  
  Presiona CTRL + C para detener el servidor
  `);
});