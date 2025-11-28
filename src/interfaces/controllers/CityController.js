/**
 * Controlador: CityController
 * Maneja las peticiones HTTP relacionadas con ciudades
 */

class CityController {
  constructor(useCases) {
    this. useCases = useCases;
  }

  /**
   * Crear una nueva ciudad
   * POST /api/v1/cities
   */
  async create(req, res, next) {
    try {
      const cityData = req.body;

      // Validar que vienen datos
      if (!cityData || Object.keys(cityData).length === 0) {
        return res. status(400).json({
          success: false,
          message: 'Los datos de la ciudad son requeridos',
          timestamp: new Date(). toISOString()
        });
      }

      // Ejecutar caso de uso
      const result = await this.useCases. createCity.execute(cityData);

      res.status(201).json({
        success: true,
        message: 'Ciudad creada exitosamente',
        data: result. city,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.create:', error.message);
      
      // Errores de validación (400)
      if (error. message.includes('obligatorio') || 
          error.message.includes('requerido') ||
          error.message.includes('debe') ||
          error.message.includes('no puede')) {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }

      // Error de país no existe (404)
      if (error. message.includes('no existe')) {
        return res. status(404).json({
          success: false,
          error: 'País no encontrado',
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }

      // Otros errores (500)
      next(error);
    }
  }

  /**
   * Obtener todas las ciudades
   * GET /api/v1/cities
   */
  async getAll(req, res, next) {
    try {
      const {
        limit = 100,
        offset = 0,
        countryId,
        capitalsOnly,
        withCountry
      } = req.query;

      const options = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        countryId: countryId || null,
        capitalsOnly: capitalsOnly === 'true',
        withCountry: withCountry === 'true'
      };

      const result = await this.useCases.getAllCities.execute(options);

      res.status(200).json({
        success: true,
        data: result. data,
        metadata: result. metadata,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.getAll:', error.message);
      next(error);
    }
  }

  /**
   * Obtener ciudad por ID
   * GET /api/v1/cities/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await this.useCases.getCityById.execute(id);

      if (!result. success) {
        return res. status(404).json({
          success: false,
          error: 'Ciudad no encontrada',
          message: result.message,
          timestamp: new Date().toISOString()
        });
      }

      res.status(200). json({
        success: true,
        data: result.data,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.getById:', error. message);
      next(error);
    }
  }

  /**
   * Obtener ciudades por país
   * GET /api/v1/countries/:countryId/cities
   */
  async getByCountry(req, res, next) {
    try {
      const { countryId } = req.params;
      const { limit = 50, offset = 0 } = req.query;

      const options = {
        countryId,
        limit: parseInt(limit),
        offset: parseInt(offset)
      };

      const result = await this.useCases.getAllCities.execute(options);

      res.status(200).json({
        success: true,
        data: result. data,
        metadata: {
          ... result.metadata,
          countryId
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.getByCountry:', error.message);
      next(error);
    }
  }

  /**
   * Actualizar una ciudad
   * PUT /api/v1/cities/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validar que vienen datos
      if (!updateData || Object. keys(updateData).length === 0) {
        return res. status(400).json({
          success: false,
          message: 'No se proporcionaron datos para actualizar',
          timestamp: new Date().toISOString()
        });
      }

      const result = await this.useCases.updateCity.execute(id, updateData);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          error: 'Ciudad no encontrada',
          message: result. message,
          timestamp: new Date().toISOString()
        });
      }

      res. status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.update:', error.message);

      // Errores de validación
      if (error.message.includes('debe') || error.message.includes('no puede')) {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }

      next(error);
    }
  }

  /**
   * Eliminar una ciudad
   * DELETE /api/v1/cities/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const result = await this.useCases.deleteCity.execute(id);

      if (!result. success) {
        return res. status(404).json({
          success: false,
          error: 'Ciudad no encontrada',
          message: result.message,
          timestamp: new Date().toISOString()
        });
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        timestamp: new Date(). toISOString()
      });

    } catch (error) {
      console.error('Error en CityController.delete:', error. message);
      next(error);
    }
  }
}

module. exports = CityController;