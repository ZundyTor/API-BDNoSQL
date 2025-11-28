/**
 * Rutas para el recurso Cities
 */

const express = require('express');

/**
 * Configurar rutas de ciudades
 */
function setupCityRoutes(cityController) {
  const router = express.Router();

  // POST /api/v1/cities - Crear nueva ciudad
  router.post('/', (req, res, next) => {
    cityController.create(req, res, next);
  });

  // GET /api/v1/cities - Obtener todas las ciudades
  // Soporta query params: ?limit=100&offset=0&capitalsOnly=true&withCountry=true 
  router.get('/', (req, res, next) => {
    cityController.getAll(req, res, next);
  });

  // GET /api/v1/cities/:id - Obtener ciudad por ID
  router.get('/:id', (req, res, next) => {
    cityController.getById(req, res, next);
  });

  // PUT /api/v1/cities/:id - Actualizar ciudad
  router.put('/:id', (req, res, next) => {
    cityController.update(req, res, next);
  });

  // DELETE /api/v1/cities/:id - Eliminar ciudad
  router.delete('/:id', (req, res, next) => {
    cityController.delete(req, res, next);
  });

  return router;
}

module.exports = setupCityRoutes;