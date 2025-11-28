/**
 * Caso de Uso: Obtener Todas las Ciudades
 * Maneja la lógica para obtener el listado de ciudades
 */

class GetAllCities {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Ejecutar el caso de uso
   */
  async execute(options = {}) {
    try {
      const {
        limit = 100,
        offset = 0,
        countryId = null,
        capitalsOnly = false,
        withCountry = false
      } = options;

      let cities;

      // Determinar qué método del repository usar
      if (capitalsOnly) {
        cities = await this.cityRepository.findCapitals(limit, offset);
      } else if (countryId) {
        cities = await this.cityRepository.findByCountryId(countryId, limit, offset);
      } else if (withCountry) {
        cities = await this.cityRepository. findAllWithCountry(limit, offset);
      } else {
        cities = await this.cityRepository.findAll(limit, offset);
      }

      // Obtener el total para metadata
      const total = await this.cityRepository.count();

      return {
        success: true,
        data: cities. map(city => city.toJSON ?  city.toJSON() : city),
        metadata: {
          total,
          limit,
          offset,
          returned: cities.length
        }
      };

    } catch (error) {
      console.error('Error en GetAllCities:', error.message);
      throw error;
    }
  }
}

module.exports = GetAllCities;