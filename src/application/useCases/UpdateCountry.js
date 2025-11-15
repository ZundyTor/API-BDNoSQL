/**
 * Caso de Uso: Actualizar un país
 * 
 * Actualiza la información de un país existente.
 */

class UpdateCountry {
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {string} id - ID del país a actualizar
   * @param {Object} data - Datos a actualizar
   * @param {Object} options - Opciones adicionales
   * @param {string} options.database - Base de datos a usar
   * @returns {Promise<Object>} País actualizado
   */
  async execute(id, data, options = {}) {
    try {
      const database = options.database || 'both';

      console.log(`\n🔄 Actualizando país con ID "${id}" en ${database}...`);

      const results = {
        success: true,
        databases: {}
      };

      let updatedCountry = null;

      // Actualizar en PostgreSQL
      if (database === 'postgresql' || database === 'both') {
        try {
          updatedCountry = await this.postgresRepo.update(id, data);
          results.databases.postgresql = { success: true };
        } catch (error) {
          results.databases.postgresql = { 
            success: false, 
            error: error.message 
          };
        }
      }

      // Actualizar en MongoDB
      if (database === 'mongodb' || database === 'both') {
        try {
          updatedCountry = await this.mongoRepo.update(id, data);
          results.databases.mongodb = { success: true };
        } catch (error) {
          results.databases.mongodb = { 
            success: false, 
            error: error.message 
          };
        }
      }

      if (!updatedCountry) {
        throw new Error('País no encontrado o no se pudo actualizar');
      }

      results.country = updatedCountry.toJSON();

      console.log(`✅ País actualizado exitosamente`);
      return results;

    } catch (error) {
      console.error(`❌ Error al actualizar país: ${error.message}`);
      throw error;
    }
  }
}

module.exports = UpdateCountry;