/**
 * Lógica para la gestión de Countries (Países)
 */

console.log('🌍 Módulo de Countries cargado');

// Esta función se llamará cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM cargado - Inicializando Countries');
    loadCountries();
});

/**
 * Cargar y mostrar todos los países
 */
async function loadCountries() {
    const container = document.getElementById('countries-list');
    
    try {
        container.innerHTML = '<p class="loading">⏳ Cargando países...</p>';
        
        const response = await window.fetchAPI('/countries? database=postgresql&limit=20');
        
        if (response.success && response.data) {
            displayCountries(response.data);
        } else {
            container. innerHTML = '<p class="error">❌ No se pudieron cargar los países</p>';
        }
        
    } catch (error) {
        console.error('Error al cargar países:', error);
        container.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`;
    }
}

/**
 * Mostrar países en cards
 */
function displayCountries(countries) {
    const container = document.getElementById('countries-list');
    
    if (countries.length === 0) {
        container.innerHTML = '<p>No hay países registrados</p>';
        return;
    }
    
    container.innerHTML = countries.map(country => `
        <div class="card">
            <h3>${country.flag || '🌍'} ${country.name}</h3>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Continente:</strong> ${country.continent}</p>
            <p><strong>Población:</strong> ${country.population. toLocaleString()}</p>
            <p><strong>Idioma:</strong> ${country.language}</p>
            ${country.currency ? `<p><strong>Moneda:</strong> ${country. currency}</p>` : ''}
            
            <div class="card-actions">
                <button class="btn btn-secondary btn-small" onclick="editCountry('${country.id}')">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteCountry('${country.id}', '${country.name}')">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Funciones placeholder (implementaremos después)
 */
function editCountry(id) {
    showToast(`Editar país ${id} - Función próximamente`, 'success');
}

function deleteCountry(id, name) {
    showToast(`Eliminar país ${name} - Función próximamente`, 'warning');
}

// Exponer funciones globalmente
window.loadCountries = loadCountries;
window.editCountry = editCountry;
window.deleteCountry = deleteCountry;