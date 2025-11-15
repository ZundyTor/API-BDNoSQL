/**
 * Caso de Uso: Obtener todos los países
 * 
 * Lista todos los países con opciones de paginación y filtrado.
 */

class GetAllCountries {
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {Object} options - Opciones de consulta
   * @param {string} options.database - Base de datos a usar ('postgresql', 'mongodb')
   * @param {number} options.limit - Límite de resultados
   * @param {number} options.offset - Desplazamiento para paginación
   * @returns {Promise<Object>} Lista de países con metadatos
   */
  async execute(options = {}) {
    try {
      const database = options.database || 'postgresql';
      const limit = options.limit || 100;
      const offset = options.offset || 0;

      console.log(`\n📋 Obteniendo todos los países desde ${database}...`);

      let countries = [];
      let total = 0;

      if (database === 'postgresql') {
        countries = await this.postgresRepo.findAll({ limit, offset });
        total = await this.postgresRepo.count();
      } else if (database === 'mongodb') {
        countries = await this.mongoRepo.findAll({ limit, offset });
        total = await this.mongoRepo.count();
      } else {
        throw new Error(`Base de datos no válida: ${database}`);
      }

      console.log(`✅ Se encontraron ${countries.length} países`);

      return {
        data: countries.map(country => country.toJSON()),
        metadata: {
          total,
          limit,
          offset,
          returned: countries.length,
          database
        }
      };

    } catch (error) {
      console.error(`❌ Error al obtener países: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GetAllCountries;