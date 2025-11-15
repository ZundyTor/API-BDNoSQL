const { Pool } = require('pg');

/**
 * Clase para manejar la conexión a PostgreSQL
 */
class PostgreSQLConnection {
  constructor() {
    // Si ya existe una instancia, devolverla (Patrón Singleton)
    if (PostgreSQLConnection.instance) {
      return PostgreSQLConnection.instance;
    }

    // Configuración del pool de conexiones
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || 5433,
      database: process.env.POSTGRES_DB || 'countries_db',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      // Configuraciones adicionales
      max: 20, // Máximo de conexiones en el pool
      idleTimeoutMillis: 30000, // Tiempo antes de cerrar conexión inactiva
      connectionTimeoutMillis: 2000, // Tiempo máximo de espera para conectar
    });

    // Manejar errores de conexión
    this.pool.on('error', (err) => {
      console.error('❌ Error inesperado en el cliente PostgreSQL:', err);
      process.exit(-1);
    });

    PostgreSQLConnection.instance = this;
  }

  /**
   * Obtiene el pool de conexiones
   * @returns {Pool} Pool de conexiones de PostgreSQL
   */
  getPool() {
    return this.pool;
  }

  /**
   * Prueba la conexión a la base de datos
   * @returns {Promise<boolean>} True si la conexión es exitosa
   */
  async testConnection() {
    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT NOW()');
      client.release();
      
      console.log('✅ Conexión a PostgreSQL exitosa');
      console.log(`   📅 Hora del servidor: ${result.rows[0].now}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error al conectar con PostgreSQL:', error.message);
      return false;
    }
  }

  /**
   * Ejecuta una consulta SQL
   * @param {string} text - Consulta SQL
   * @param {Array} params - Parámetros de la consulta
   * @returns {Promise<Object>} Resultado de la consulta
   */
  async query(text, params) {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      
      console.log('📊 Consulta ejecutada:', {
        text,
        duration: `${duration}ms`,
        rows: result.rowCount
      });
      
      return result;
    } catch (error) {
      console.error('❌ Error en consulta SQL:', error.message);
      throw error;
    }
  }

  /**
   * Cierra todas las conexiones del pool
   */
  async close() {
    try {
      await this.pool.end();
      console.log('✅ Conexiones PostgreSQL cerradas correctamente');
    } catch (error) {
      console.error('❌ Error al cerrar conexiones:', error.message);
    }
  }

  /**
   * Inicializa las tablas necesarias en la base de datos
   */
  async initializeTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS countries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        continent VARCHAR(50) NOT NULL,
        capital VARCHAR(255) NOT NULL,
        population BIGINT NOT NULL,
        language VARCHAR(100) NOT NULL,
        flag VARCHAR(10),
        area NUMERIC(12, 2),
        currency VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT valid_continent CHECK (
          continent IN ('África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida')
        )
      );

      -- Índices para mejorar las consultas
      CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);
      CREATE INDEX IF NOT EXISTS idx_countries_continent ON countries(continent);
    `;

    try {
      await this.query(createTableQuery);
      console.log('✅ Tabla "countries" inicializada correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al crear tabla:', error.message);
      return false;
    }
  }
}

// Exportamos una única instancia (Singleton)
module.exports = new PostgreSQLConnection(); 