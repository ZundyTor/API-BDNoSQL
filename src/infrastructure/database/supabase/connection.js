/**
 * Conexión a PostgreSQL en Supabase (Nube)
 * 
 * Este módulo maneja la conexión a la base de datos PostgreSQL
 * alojada en Supabase. 
 */

const { Pool } = require('pg');
require('dotenv').config();

class SupabaseConnection {
  constructor() {
    this.pool = null;
  }

  /**
   * Crear pool de conexiones
   */
  createPool() {
    if (this.pool) {
      return this.pool;
    }

    try {
      this.pool = new Pool({
        connectionString: process.env.SUPABASE_CONNECTION_STRING,
        ssl: {
          rejectUnauthorized: false // Necesario para Supabase
        },
        max: 10, // Máximo 10 conexiones simultáneas
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });

      console.log('✅ Pool de conexiones a Supabase creado');
      
      // Manejar errores del pool
      this.pool.on('error', (err) => {
        console.error('❌ Error inesperado en el pool de Supabase:', err);
      });

      return this.pool;
      
    } catch (error) {
      console.error('❌ Error al crear pool de Supabase:', error. message);
      throw error;
    }
  }

  /**
   * Obtener cliente del pool
   */
  async getClient() {
    if (! this.pool) {
      this.createPool();
    }
    return await this.pool.connect();
  }

  /**
   * Probar conexión
   */
  async testConnection() {
    try {
      const client = await this.getClient();
      const result = await client.query('SELECT NOW() as current_time, current_database() as database');
      client.release();
      
      console.log('✅ Conexión a Supabase exitosa');
      console.log(`   Base de datos: ${result.rows[0].database}`);
      console.log(`   Hora del servidor: ${result.rows[0].  current_time}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error al conectar con Supabase:', error.message);
      throw error;
    }
  }

  /**
   * Cerrar todas las conexiones
   */
  async close() {
    if (this. pool) {
      await this. pool.end();
      console. log('✅ Conexiones a Supabase cerradas');
      this.pool = null;
    }
  }

  /**
   * Ejecutar query directamente
   */
  async query(text, params) {
    if (!this.pool) {
      this.createPool();
    }
    
    try {
      const result = await this.pool.query(text, params);
      return result;
    } catch (error) {
      console.error('❌ Error en query a Supabase:', error.message);
      throw error;
    }
  }
}

// Exportar instancia única (Singleton)
module.exports = new SupabaseConnection();