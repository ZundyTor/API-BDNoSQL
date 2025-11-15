/**
 * Caso de Uso: Crear un nuevo país
 * 
 * Este caso de uso encapsula la lógica para crear un país
 * y guardarlo en ambas bases de datos (PostgreSQL y MongoDB).
 */

const Country = require('../../domain/entities/Country');

class CreateCountry {
  /**
   * Constructor
   * @param {Object} repositories - Repositorios disponibles
   * @param {Object} repositories.postgresql - Repository de PostgreSQL
   * @param {Object} repositories.mongodb - Repository de MongoDB
   */
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {Object} countryData - Datos del país a crear
   * @param {Object} options - Opciones adicionales
   * @param {string} options.database - Base de datos a usar ('postgresql', 'mongodb', 'both')
   * @returns {Promise<Object>} Resultado de la operación
   */
  async execute(countryData, options = {}) {
    try {
      const database = options.database || 'both';

      // Validar que los datos sean correctos creando una entidad
      const country = new Country(countryData);

      console.log(`\n🔄 Creando país "${country.name}" en ${database}...`);

      const results = {
        success: true,
        country: country.toJSON(),
        databases: {}
      };

      // Guardar en PostgreSQL
      if (database === 'postgresql' || database === 'both') {
        try {
          await this.postgresRepo.create(country);
          results.databases.postgresql = { success: true };
        } catch (error) {
          results.databases.postgresql = { 
            success: false, 
            error: error.message 
          };
          if (database === 'postgresql') {
            throw error;
          }
        }
      }

      // Guardar en MongoDB
      if (database === 'mongodb' || database === 'both') {
        try {
          await this.mongoRepo.create(country);
          results.databases.mongodb = { success: true };
        } catch (error) {
          results.databases.mongodb = { 
            success: false, 
            error: error.message 
          };
          if (database === 'mongodb') {
            throw error;
          }
        }
      }

      // Verificar si al menos una BD tuvo éxito
      const hasSuccess = Object.values(results.databases).some(db => db.success);
      
      if (!hasSuccess) {
        throw new Error('No se pudo guardar el país en ninguna base de datos');
      }

      console.log(`✅ País "${country.name}" creado exitosamente`);
      return results;

    } catch (error) {
      console.error(`❌ Error al crear país: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CreateCountry;