/**
 * Configuración y funciones para consumir la API
 */

// Verificar si ya está inicializado
if (typeof window.API_INITIALIZED === 'undefined') {
    
    // ⭐ OPCIÓN 2: Usar API de producción (desarrollo con datos reales)
    window. API_BASE_URL = 'https://api-bdnosql.onrender.com/api/v1';

    console.log('🌐 API URL configurada:', window.API_BASE_URL);
    console.log('📍 Modo: Usando API de PRODUCCIÓN (Supabase)');

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
                ...options
            });

            const data = await response.json();

            if (!response.ok) {
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