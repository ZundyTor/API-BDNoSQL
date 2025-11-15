/**
 * Caso de Uso: Obtener un país por ID
 * 
 * Busca un país en la base de datos especificada.
 */

class GetCountryById {
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {string} id - ID del país
   * @param {Object} options - Opciones adicionales
   * @param {string} options.database - Base de datos a usar ('postgresql', 'mongodb')
   * @returns {Promise<Object|null>} País encontrado o null
   */
  async execute(id, options = {}) {
    try {
      const database = options.database || 'postgresql';

      console.log(`\n🔍 Buscando país con ID "${id}" en ${database}...`);

      let country = null;

      if (database === 'postgresql') {
        country = await this.postgresRepo.findById(id);
      } else if (database === 'mongodb') {
        country = await this.mongoRepo.findById(id);
      } else {
        throw new Error(`Base de datos no válida: ${database}`);
      }

      if (country) {
        console.log(`✅ País encontrado: ${country.name}`);
        return country.toJSON();
      } else {
        console.log(`⚠️ País no encontrado`);
        return null;
      }

    } catch (error) {
      console.error(`❌ Error al buscar país: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GetCountryById;