/**
 * Caso de Uso: Crear Ciudad
 * Maneja la lógica de negocio para crear una nueva ciudad
 */

const City = require('../../../domain/entities/City');

class CreateCity {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }


  /**
   * Ejecutar el caso de uso
   */
  async execute(cityData) {
    try {
      // Validar que vienen los datos necesarios
      if (!cityData) {
        throw new Error('Los datos de la ciudad son requeridos');
      }

      // Crear la entidad City (esto valida automáticamente)
      const city = new City(cityData);

      // Guardar en el repositorio
      const createdCity = await this.cityRepository.create(city);

      return {
        success: true,
        city: createdCity. toJSON()
      };

    } catch (error) {
      console.error('Error en CreateCity:', error.message);
      throw error;
    }
  }
}

module.exports = CreateCity;