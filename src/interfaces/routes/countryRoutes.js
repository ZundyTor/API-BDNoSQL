/**
 * Rutas de Países
 * 
 * Define todos los endpoints HTTP para la gestión de países.
 */

const express = require('express');
const router = express.Router();

/**
 * Configura las rutas del controlador
 * @param {CountryController} controller - Instancia del controlador
 * @returns {Router} Router configurado
 */
function setupCountryRoutes(controller) {
  
  /**
   * @route   POST /api/v1/countries
   * @desc    Crear un nuevo país
   * @query   database - Base de datos a usar (postgresql, mongodb, both)
   * @body    Country data
   * @access  Public
   */
  router.post('/', (req, res, next) => controller.create(req, res, next));

  /**
   * @route   GET /api/v1/countries
   * @desc    Obtener todos los países
   * @query   database - Base de datos a consultar (postgresql, mongodb)
   * @query   limit - Límite de resultados (default: 100)
   * @query   offset - Desplazamiento para paginación (default: 0)
   * @access  Public
   */
  router.get('/', (req, res, next) => controller.getAll(req, res, next));

  /**
   * @route   GET /api/v1/countries/stats/summary
   * @desc    Obtener estadísticas generales
   * @query   database - Base de datos a consultar
   * @access  Public
   */
  router.get('/stats/summary', (req, res, next) => controller.getStats(req, res, next));

  /**
   * @route   GET /api/v1/countries/continent/:continent
   * @desc    Obtener países por continente
   * @query   database - Base de datos a consultar
   * @access  Public
   */
  router.get('/continent/:continent', (req, res, next) => controller.getByContinent(req, res, next));

  /**
   * @route   GET /api/v1/countries/:id
   * @desc    Obtener un país por ID
   * @query   database - Base de datos a consultar
   * @access  Public
   */
  router.get('/:id', (req, res, next) => controller.getById(req, res, next));

  /**
   * @route   PUT /api/v1/countries/:id
   * @desc    Actualizar un país
   * @query   database - Base de datos a actualizar (postgresql, mongodb, both)
   * @body    Datos a actualizar
   * @access  Public
   */
  router.put('/:id', (req, res, next) => controller.update(req, res, next));

  /**
   * @route   DELETE /api/v1/countries/:id
   * @desc    Eliminar un país
   * @query   database - Base de datos de donde eliminar (postgresql, mongodb, both)
   * @access  Public
   */
  router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

  return router;
}

module.exports = setupCountryRoutes;