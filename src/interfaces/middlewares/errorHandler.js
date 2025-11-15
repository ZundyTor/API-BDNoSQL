/**
 * Middleware para manejo centralizado de errores
 * 
 * Este middleware captura todos los errores de la aplicación
 * y devuelve respuestas HTTP consistentes.
 */

function errorHandler(err, req, res, next) {
  console.error('❌ Error capturado:', err.message);
  console.error(err.stack);

  // Error de validación (entidad Country)
  if (err.message.includes('requerido') || err.message.includes('válido')) {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error de recurso no encontrado
  if (err.message.includes('no encontrado') || err.message.includes('not found')) {
    return res.status(404).json({
      success: false,
      error: 'Recurso no encontrado',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error de duplicado (ya existe)
  if (err.message.includes('Ya existe')) {
    return res.status(409).json({
      success: false,
      error: 'Conflicto',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error de base de datos
  if (err.code) {
    return res.status(500).json({
      success: false,
      error: 'Error de base de datos',
      message: 'Ocurrió un error al procesar la solicitud',
      code: err.code,
      timestamp: new Date().toISOString()
    });
  }

  // Error genérico
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: err.message || 'Ocurrió un error inesperado',
    timestamp: new Date().toISOString()
  });
}

module.exports = errorHandler;