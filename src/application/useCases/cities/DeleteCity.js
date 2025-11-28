/**
 * Caso de Uso: Eliminar Ciudad
 * Maneja la lógica de negocio para eliminar una ciudad
 */

class DeleteCity {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Ejecutar el caso de uso
   */
  async execute(cityId) {
    try {
      // Validar que el ID no esté vacío
      if (!cityId || cityId.trim() === '') {
        throw new Error('El ID de la ciudad es requerido');
      }

      // Verificar que la ciudad existe
      const existingCity = await this.cityRepository. findById(cityId);
      
      if (!existingCity) {
        return {
          success: false,
          message: `Ciudad con ID ${cityId} no encontrada`,
          data: null
        };
      }

      // Eliminar del repositorio
      const deletedCity = await this.cityRepository.delete(cityId);

      return {
        success: true,
        message: 'Ciudad eliminada exitosamente',
        data: deletedCity ?  deletedCity.toJSON() : null
      };

    } catch (error) {
      console. error('Error en DeleteCity:', error.message);
      throw error;
    }
  }
}

module.exports = DeleteCity;