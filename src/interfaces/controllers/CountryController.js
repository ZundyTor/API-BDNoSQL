/**
 * Controlador de Países
 * 
 * Este controlador maneja todas las peticiones HTTP relacionadas con países.
 * Actúa como intermediario entre las rutas y los casos de uso.
 */

class CountryController {
  /**
   * Constructor
   * @param {Object} useCases - Casos de uso disponibles
   */
  constructor(useCases) {
    this.createCountryUseCase = useCases.createCountry;
    this.getCountryByIdUseCase = useCases.getCountryById;
    this.getAllCountriesUseCase = useCases.getAllCountries;
    this.getCountriesByContinentUseCase = useCases.getCountriesByContinent;
    this.updateCountryUseCase = useCases.updateCountry;
    this.deleteCountryUseCase = useCases.deleteCountry;
  }

  /**
   * POST /api/v1/countries
   * Crea un nuevo país
   */
  async create(req, res, next) {
    try {
      const countryData = req.body;
      const database = req.query.database || 'both'; // postgresql, mongodb, both

      const result = await this.createCountryUseCase.execute(countryData, { database });

      res.status(201).json({
        success: true,
        message: 'País creado exitosamente',
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/countries/:id
   * Obtiene un país por su ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const database = req.query.database || 'postgresql';

      const country = await this.getCountryByIdUseCase.execute(id, { database });

      if (!country) {
        return res.status(404).json({
          success: false,
          message: 'País no encontrado',
          timestamp: new Date().toISOString()
        });
      }

      res.status(200).json({
        success: true,
        data: country,
        source: database,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/countries
   * Obtiene todos los países con paginación
   */
  async getAll(req, res, next) {
    try {
      const database = req.query.database || 'postgresql';
      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;

      const result = await this.getAllCountriesUseCase.execute({ 
        database, 
        limit, 
        offset 
      });

      res.status(200).json({
        success: true,
        data: result.data,
        metadata: result.metadata,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/countries/continent/:continent
   * Obtiene países por continente
   */
  async getByContinent(req, res, next) {
    try {
      const { continent } = req.params;
      const database = req.query.database || 'postgresql';

      const result = await this.getCountriesByContinentUseCase.execute(continent, { database });

      res.status(200).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/v1/countries/:id
   * Actualiza un país existente
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const database = req.query.database || 'both';

      const result = await this.updateCountryUseCase.execute(id, updateData, { database });

      res.status(200).json({
        success: true,
        message: 'País actualizado exitosamente',
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/countries/:id
   * Elimina un país
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const database = req.query.database || 'both';

      const result = await this.deleteCountryUseCase.execute(id, { database });

      res.status(200).json({
        success: true,
        message: 'País eliminado exitosamente',
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/countries/stats/summary
   * Obtiene estadísticas generales
   */
  async getStats(req, res, next) {
    try {
      const database = req.query.database || 'postgresql';

      // Aquí podrías crear un caso de uso específico para estadísticas
      // Por ahora, hacemos una consulta simple
      const allCountries = await this.getAllCountriesUseCase.execute({ database, limit: 1000 });

      const stats = {
        total: allCountries.metadata.total,
        database: database,
        byContinent: {},
        totalPopulation: 0
      };

      // Calcular estadísticas
      allCountries.data.forEach(country => {
        if (!stats.byContinent[country.continent]) {
          stats.byContinent[country.continent] = {
            count: 0,
            population: 0
          };
        }
        stats.byContinent[country.continent].count++;
        stats.byContinent[country.continent].population += country.population;
        stats.totalPopulation += country.population;
      });

      res.status(200).json({
        success: true,
        data: stats,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = CountryController;