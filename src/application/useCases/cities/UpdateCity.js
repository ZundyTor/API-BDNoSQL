/**
 * Caso de Uso: Actualizar Ciudad
 * Maneja la lógica de negocio para actualizar una ciudad existente
 */

class UpdateCity {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Ejecutar el caso de uso
   */
  async execute(cityId, updateData) {
    try {
      // Validar que el ID no esté vacío
      if (!cityId || cityId.trim() === '') {
        throw new Error('El ID de la ciudad es requerido');
      }

      // Validar que hay datos para actualizar
      if (! updateData || Object.keys(updateData).length === 0) {
        throw new Error('No se proporcionaron datos para actualizar');
      }

      // Verificar que la ciudad existe
      const existingCity = await this.cityRepository.findById(cityId);
      
      if (!existingCity) {
        return {
          success: false,
          message: `Ciudad con ID ${cityId} no encontrada`,
          data: null
        };
      }

      // Actualizar la ciudad (el repository maneja las validaciones)
      existingCity.update(updateData);

      // Guardar en el repositorio
      const updatedCity = await this.cityRepository.update(cityId, updateData);

      return {
        success: true,
        message: 'Ciudad actualizada exitosamente',
        data: updatedCity.toJSON()
      };

    } catch (error) {
      console.error('Error en UpdateCity:', error.message);
      throw error;
    }
  }
}

module. exports = UpdateCity;