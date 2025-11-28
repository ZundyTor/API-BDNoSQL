/**
 * Configuración y funciones para consumir la API
 */

// Verificar si ya está inicializado
if (typeof window.API_INITIALIZED === 'undefined') {
    
    // Detectar automáticamente si estamos en local o producción
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Si estamos en localhost, usar API de producción (Opción 2)
    // Si estamos en producción, usar /api/v1 relativo
    window.  API_BASE_URL = isLocalhost 
        ? 'https://api-bdnosql.onrender.com/api/v1'  // Localhost apunta a producción
        : '/api/v1';  // Producción usa rutas relativas

    console.log('🌐 API URL configurada:', window.API_BASE_URL);
    console.log('📍 Hostname:', window.location.hostname);
    console.log('📍 Modo:', isLocalhost ? 'DESARROLLO (apuntando a producción)' : 'PRODUCCIÓN');

    /**
     * Función genérica para hacer peticiones HTTP
     */
    window.fetchAPI = async function(endpoint, options = {}) {
        const url = `${window.API_BASE_URL}${endpoint}`;
        
        try {
            console.log(`📡 Petición: ${options.method || 'GET'} ${url}`);
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ... options
            });

            const data = await response.json();

            if (! response.ok) {
                throw new Error(data.message || 'Error en la petición');
            }

            console.log('✅ Respuesta exitosa:', data);
            return data;

        } catch (error) {
            console.error('❌ Error en fetchAPI:', error);
            throw error;
        }
    };

    // Marcar como inicializado
    window.API_INITIALIZED = true;
}