/**
 * Caso de Uso: Obtener Ciudad por ID
 * Maneja la lógica para buscar una ciudad específica
 */

class GetCityById {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Ejecutar el caso de uso
   */
  async execute(cityId) {
    try {
      // Validar que el ID no esté vacío
      if (!cityId || cityId. trim() === '') {
        throw new Error('El ID de la ciudad es requerido');
      }

      // Buscar en el repositorio
      const city = await this.cityRepository.findById(cityId);

      // Si no se encuentra, retornar null
      if (!city) {
        return {
          success: false,
          message: `Ciudad con ID ${cityId} no encontrada`,
          data: null
        };
      }

      return {
        success: true,
        data: city.toJSON()
      };

    } catch (error) {
      console.error('Error en GetCityById:', error. message);
      throw error;
    }
  }
}

module.exports = GetCityById;