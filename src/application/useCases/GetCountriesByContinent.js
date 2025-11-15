/**
 * Caso de Uso: Obtener países por continente
 * 
 * Filtra países según el continente especificado.
 */

class GetCountriesByContinent {
  constructor(repositories) {
    this.postgresRepo = repositories.postgresql;
    this.mongoRepo = repositories.mongodb;
  }

  /**
   * Ejecuta el caso de uso
   * @param {string} continent - Nombre del continente
   * @param {Object} options - Opciones adicionales
   * @param {string} options.database - Base de datos a usar
   * @returns {Promise<Object>} Lista de países del continente
   */
  async execute(continent, options = {}) {
    try {
      const database = options.database || 'postgresql';

      // Validar continente
      const validContinents = ['África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida'];
      if (!validContinents.includes(continent)) {
        throw new Error(`Continente no válido. Opciones: ${validContinents.join(', ')}`);
      }

      console.log(`\n🌍 Buscando países de ${continent} en ${database}...`);

      let countries = [];

      if (database === 'postgresql') {
        countries = await this.postgresRepo.findByContinent(continent);
      } else if (database === 'mongodb') {
        countries = await this.mongoRepo.findByContinent(continent);
      } else {
        throw new Error(`Base de datos no válida: ${database}`);
      }

      console.log(`✅ Se encontraron ${countries.length} países en ${continent}`);

      return {
        continent,
        count: countries.length,
        countries: countries.map(country => country.toJSON()),
        database
      };

    } catch (error) {
      console.error(`❌ Error al buscar países: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GetCountriesByContinent;