// Importamos las dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuramos las variables de entorno
dotenv.config();

// Importar conexiones a bases de datos
const postgresConnection = require('./src/infrastructure/database/postgresql/connection');
const mongoConnection = require('./src/infrastructure/database/mongodb/connection');

// Importar repositories
const CountryPostgreSQLRepository = require('./src/infrastructure/repositories/CountryPostgreSQLRepository');
const CountryMongoDBRepository = require('./src/infrastructure/repositories/CountryMongoDBRepository');

// Importar casos de uso
const CreateCountry = require('./src/application/useCases/CreateCountry');
const GetCountryById = require('./src/application/useCases/GetCountryById');
const GetAllCountries = require('./src/application/useCases/GetAllCountries');
const GetCountriesByContinent = require('./src/application/useCases/GetCountriesByContinent');
const UpdateCountry = require('./src/application/useCases/UpdateCountry');
const DeleteCountry = require('./src/application/useCases/DeleteCountry');

// Importar controladores y rutas
const CountryController = require('./src/interfaces/controllers/CountryController');
const setupCountryRoutes = require('./src/interfaces/routes/countryRoutes');
const errorHandler = require('./src/interfaces/middlewares/errorHandler');

// Creamos la aplicación Express
const app = express();

// Configuramos el puerto
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(express.json());
app.use(cors());

// Middleware para logging de peticiones
app.use((req, res, next) => {
  console.log(`\n📨 ${req.method} ${req.path}`);
  console.log('Query params:', req.query);
  if (Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// ==========================================
// INICIALIZACIÓN DE DEPENDENCIAS
// ==========================================

// Repositories
const repositories = {
  postgresql: new CountryPostgreSQLRepository(),
  mongodb: new CountryMongoDBRepository()
};

// Casos de uso
const useCases = {
  createCountry: new CreateCountry(repositories),
  getCountryById: new GetCountryById(repositories),
  getAllCountries: new GetAllCountries(repositories),
  getCountriesByContinent: new GetCountriesByContinent(repositories),
  updateCountry: new UpdateCountry(repositories),
  deleteCountry: new DeleteCountry(repositories)
};

// Controlador
const countryController = new CountryController(useCases);

// ==========================================
// RUTAS
// ==========================================

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🌍 API de Países - PostgreSQL & MongoDB',
    version: '1.0.0',
    author: 'ZundyTor',
    endpoints: {
      health: '/health',
      api: '/api/v1/countries',
      documentation: '/api/v1/docs'
    },
    databases: {
      postgresql: 'Conectado',
      mongodb: 'Conectado'
    }
  });
});

// Ruta de health check
app.get('/health', async (req, res) => {
  try {
    // Verificar conexión a PostgreSQL
    const postgresStatus = await postgresConnection.testConnection()
      .then(() => 'OK')
      .catch(() => 'ERROR');

    // Verificar conexión a MongoDB
    const mongoStatus = await mongoConnection.testConnection()
      .then(() => 'OK')
      .catch(() => 'ERROR');

    const overallStatus = (postgresStatus === 'OK' && mongoStatus === 'OK') ? 'healthy' : 'degraded';

    res.status(overallStatus === 'healthy' ? 200 : 503).json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      databases: {
        postgresql: postgresStatus,
        mongodb: mongoStatus
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Documentación simple de la API
app.get('/api/v1/docs', (req, res) => {
  res.json({
    title: 'Documentación API de Países',
    version: '1.0.0',
    baseUrl: `http://localhost:${PORT}/api/v1`,
    endpoints: [
      {
        method: 'POST',
        path: '/countries',
        description: 'Crear un nuevo país',
        query: '?database=both|postgresql|mongodb',
        body: {
          name: 'string (requerido)',
          continent: 'string (requerido)',
          capital: 'string (requerido)',
          population: 'number (requerido)',
          language: 'string (requerido)',
          flag: 'string (opcional)',
          area: 'number (opcional)',
          currency: 'string (opcional)'
        }
      },
      {
        method: 'GET',
        path: '/countries',
        description: 'Obtener todos los países',
        query: '?database=postgresql|mongodb&limit=100&offset=0'
      },
      {
        method: 'GET',
        path: '/countries/:id',
        description: 'Obtener un país por ID',
        query: '?database=postgresql|mongodb'
      },
      {
        method: 'GET',
        path: '/countries/continent/:continent',
        description: 'Obtener países por continente',
        query: '?database=postgresql|mongodb',
        continents: ['África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida']
      },
      {
        method: 'GET',
        path: '/countries/stats/summary',
        description: 'Obtener estadísticas generales',
        query: '?database=postgresql|mongodb'
      },
      {
        method: 'PUT',
        path: '/countries/:id',
        description: 'Actualizar un país',
        query: '?database=both|postgresql|mongodb',
        body: 'Campos a actualizar'
      },
      {
        method: 'DELETE',
        path: '/countries/:id',
        description: 'Eliminar un país',
        query: '?database=both|postgresql|mongodb'
      }
    ]
  });
});

// Rutas de la API
app.use('/api/v1/countries', setupCountryRoutes(countryController));

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.url,
    timestamp: new Date().toISOString()
  });
});

// Manejador de errores global
app.use(errorHandler);

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

async function startServer() {
  try {
    console.log('\n🔄 Inicializando servidor...\n');

    // Inicializar PostgreSQL
    console.log('📊 Conectando a PostgreSQL...');
    await postgresConnection.testConnection();
    await postgresConnection.initializeTables();

    // Inicializar MongoDB
    console.log('📊 Conectando a MongoDB...');
    await mongoConnection.connect();
    await mongoConnection.createIndexes();

    // Iniciar servidor HTTP
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════╗
║          🚀 SERVIDOR INICIADO CORRECTAMENTE            ║
╚════════════════════════════════════════════════════════╝
  
  📡 Puerto:        ${PORT}
  🌐 URL:           http://localhost:${PORT}
  📚 Documentación: http://localhost:${PORT}/api/v1/docs
  🏥 Health Check:  http://localhost:${PORT}/health
  
  💾 Bases de datos:
     ✅ PostgreSQL - Conectado
     ✅ MongoDB    - Conectado
  
  📋 Endpoints disponibles:
     POST   /api/v1/countries
     GET    /api/v1/countries
     GET    /api/v1/countries/:id
     GET    /api/v1/countries/continent/:continent
     GET    /api/v1/countries/stats/summary
     PUT    /api/v1/countries/:id
     DELETE /api/v1/countries/:id
  
  Presiona CTRL + C para detener el servidor
      `);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Cerrando servidor...');
  await postgresConnection.close();
  await mongoConnection.close();
  console.log('✅ Servidor cerrado correctamente');
  process.exit(0);
});

// Iniciar el servidor
startServer();