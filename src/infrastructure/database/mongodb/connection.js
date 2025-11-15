/**
 * Conexión a MongoDB
 * 
 * Este archivo maneja la conexión con la base de datos MongoDB
 * usando el patrón Singleton para mantener una única instancia de conexión.
 */

const { MongoClient } = require('mongodb');

/**
 * Clase para manejar la conexión a MongoDB
 */
class MongoDBConnection {
  constructor() {
    // Si ya existe una instancia, devolverla (Patrón Singleton)
    if (MongoDBConnection.instance) {
      return MongoDBConnection.instance;
    }

    this.client = null;
    this.db = null;
    this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/countries_db';
    
    MongoDBConnection.instance = this;
  }

  /**
   * Conecta a MongoDB
   * @returns {Promise<boolean>} True si la conexión es exitosa
   */
  async connect() {
    try {
      if (this.client && this.client.topology && this.client.topology.isConnected()) {
        console.log('✅ Ya existe una conexión activa a MongoDB');
        return true;
      }

      // Opciones de conexión
      const options = {
        maxPoolSize: 10, // Máximo de conexiones en el pool
        serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
        socketTimeoutMS: 45000, // Timeout de socket
      };

      console.log('🔄 Conectando a MongoDB...');
      
      this.client = new MongoClient(this.uri, options);
      await this.client.connect();

      // Extraer el nombre de la base de datos de la URI
      const dbName = this._extractDbName(this.uri);
      this.db = this.client.db(dbName);

      console.log('✅ Conexión a MongoDB exitosa');
      console.log(`   📊 Base de datos: ${dbName}`);

      return true;

    } catch (error) {
      console.error('❌ Error al conectar con MongoDB:', error.message);
      return false;
    }
  }

  /**
   * Obtiene la base de datos
   * @returns {Db} Instancia de la base de datos MongoDB
   */
  getDb() {
    if (!this.db) {
      throw new Error('No hay conexión a MongoDB. Llama a connect() primero.');
    }
    return this.db;
  }

  /**
   * Obtiene el cliente de MongoDB
   * @returns {MongoClient} Cliente de MongoDB
   */
  getClient() {
    if (!this.client) {
      throw new Error('No hay conexión a MongoDB. Llama a connect() primero.');
    }
    return this.client;
  }

  /**
   * Obtiene una colección específica
   * @param {string} collectionName - Nombre de la colección
   * @returns {Collection} Colección de MongoDB
   */
  getCollection(collectionName) {
    return this.getDb().collection(collectionName);
  }

  /**
   * Prueba la conexión a la base de datos
   * @returns {Promise<boolean>} True si la conexión es exitosa
   */
  async testConnection() {
    try {
      await this.connect();
      
      // Hacer un ping a la base de datos
      const adminDb = this.db.admin();
      const result = await adminDb.ping();
      
      if (result.ok === 1) {
        console.log('✅ Ping a MongoDB exitoso');
        return true;
      }
      
      return false;

    } catch (error) {
      console.error('❌ Error al probar conexión con MongoDB:', error.message);
      return false;
    }
  }

  /**
   * Cierra la conexión a MongoDB
   */
  async close() {
    try {
      if (this.client) {
        await this.client.close();
        this.client = null;
        this.db = null;
        console.log('✅ Conexión a MongoDB cerrada correctamente');
      }
    } catch (error) {
      console.error('❌ Error al cerrar conexión:', error.message);
    }
  }

  /**
   * Crea índices para la colección de países
   */
  async createIndexes() {
    try {
      const collection = this.getCollection('countries');

      // Índice único por nombre
      await collection.createIndex({ name: 1 }, { unique: true });
      
      // Índice por continente
      await collection.createIndex({ continent: 1 });
      
      // Índice por población (descendente)
      await collection.createIndex({ population: -1 });
      
      // Índice compuesto por continente y población
      await collection.createIndex({ continent: 1, population: -1 });

      console.log('✅ Índices creados en MongoDB');
      return true;

    } catch (error) {
      console.error('❌ Error al crear índices:', error.message);
      return false;
    }
  }

  /**
   * Obtiene estadísticas de la base de datos
   * @returns {Promise<Object>} Estadísticas de la BD
   */
  async getStats() {
    try {
      const stats = await this.db.stats();
      
      console.log('📊 Estadísticas de MongoDB:');
      console.log(`   - Base de datos: ${stats.db}`);
      console.log(`   - Colecciones: ${stats.collections}`);
      console.log(`   - Documentos: ${stats.objects}`);
      console.log(`   - Tamaño: ${this._formatBytes(stats.dataSize)}`);
      
      return stats;

    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error.message);
      return null;
    }
  }

  /**
   * Extrae el nombre de la base de datos de la URI
   * @private
   * @param {string} uri - URI de conexión
   * @returns {string} Nombre de la base de datos
   */
  _extractDbName(uri) {
    // Para URIs locales: mongodb://localhost:27017/nombre_db
    // Para URIs Atlas: mongodb+srv://user:pass@cluster.mongodb.net/nombre_db
    
    const match = uri.match(/\/([^/?]+)(\?|$)/);
    return match ? match[1] : 'countries_db';
  }

  /**
   * Formatea bytes a una unidad legible
   * @private
   * @param {number} bytes - Cantidad de bytes
   * @returns {string} Tamaño formateado
   */
  _formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

// Exportamos una única instancia (Singleton)
module.exports = new MongoDBConnection();