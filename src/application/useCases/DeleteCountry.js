/**
 * Caso de Uso: Eliminar un país
 * 
 * Elimina un país de la base de datos especificada.
 */

class DeleteCountry {
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {string} id - ID del país a eliminar
   * @param {Object} options - Opciones adicionales
   * @param {string} options.database - Base de datos a usar
   * @returns {Promise<Object>} Resultado de la operación
   */
  async execute(id, options = {}) {
    try {
      const database = options.database || 'both';

      console.log(`\n🗑️ Eliminando país con ID "${id}" en ${database}...`);

      const results = {
        success: true,
        databases: {}
      };

      // Eliminar de PostgreSQL
      if (database === 'postgresql' || database === 'both') {
        try {
          const deleted = await this.postgresRepo.delete(id);
          results.databases.postgresql = { success: deleted };
        } catch (error) {
          results.databases.postgresql = { 
            success: false, 
            error: error.message 
          };
        }
      }

      // Eliminar de MongoDB
      if (database === 'mongodb' || database === 'both') {
        try {
          const deleted = await this.mongoRepo.delete(id);
          results.databases.mongodb = { success: deleted };
        } catch (error) {
          results.databases.mongodb = { 
            success: false, 
            error: error.message 
          };
        }
      }

      // Verificar si al menos una BD tuvo éxito
      const hasSuccess = Object.values(results.databases).some(db => db.success);
      
      if (!hasSuccess) {
        throw new Error('No se pudo eliminar el país de ninguna base de datos');
      }

      console.log(`✅ País eliminado exitosamente`);
      return results;

    } catch (error) {
      console.error(`❌ Error al eliminar país: ${error.message}`);
      throw error;
    }
  }
}

module.exports = DeleteCountry;