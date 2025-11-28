/**
 * Lógica para la gestión de Cities (Ciudades)
 */

console.log('🏙️ Módulo de Cities cargado');

/**
 * Cargar y mostrar todas las ciudades
 */
async function loadCities() {
    const container = document.getElementById('cities-list');
    
    try {
        container.innerHTML = '<p class="loading">⏳ Cargando ciudades... </p>';
        
        const response = await window.fetchAPI('/cities?limit=20');
        
        if (response.success && response.data) {
            displayCities(response.data);
        } else {
            container.innerHTML = '<p class="error">❌ No se pudieron cargar las ciudades</p>';
        }
        
    } catch (error) {
        console.error('Error al cargar ciudades:', error);
        container.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`;
    }
}

/**
 * Mostrar ciudades en cards
 */
function displayCities(cities) {
    const container = document.getElementById('cities-list');
    
    if (cities.length === 0) {
        container.innerHTML = '<p>No hay ciudades registradas</p>';
        return;
    }
    
    container.innerHTML = cities.map(city => `
        <div class="card">
            <h3>${city.isCapital ? '⭐' : '🏙️'} ${city.name}</h3>
            <p><strong>Población:</strong> ${city.population. toLocaleString()}</p>
            <p><strong>Capital:</strong> ${city.isCapital ? 'Sí' : 'No'}</p>
            ${city.latitude ? `<p><strong>Ubicación:</strong> ${city.latitude.toFixed(4)}, ${city.longitude.toFixed(4)}</p>` : ''}
            
            <div class="card-actions">
                <button class="btn btn-secondary btn-small" onclick="editCity('${city.id}')">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteCity('${city.id}', '${city.name}')">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `). join('');
}

/**
 * Funciones placeholder (implementaremos después)
 */
function editCity(id) {
    showToast(`Editar ciudad ${id} - Función próximamente`, 'success');
}

function deleteCity(id, name) {
    showToast(`Eliminar ciudad ${name} - Función próximamente`, 'warning');
}

// Exponer funciones globalmente
window.loadCities = loadCities;
window.editCity = editCity;
window.deleteCity = deleteCity;