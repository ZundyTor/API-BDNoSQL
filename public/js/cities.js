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
async function editCity(id) {
    try {
        // Obtener datos actuales de la ciudad
        showToast('⏳ Cargando datos de la ciudad... ', 'success');
        
        const response = await window.fetchAPI(`/cities/${id}`);
        
        if (!response.success || !response.data) {
            showToast('❌ No se pudo cargar la ciudad', 'error');
            return;
        }

        const city = response.data;
        
        // Obtener lista de países para el selector
        const countriesResponse = await window.fetchAPI('/countries?database=postgresql&limit=100');
        
        if (!countriesResponse.success || !countriesResponse.data) {
            showToast('❌ No se pudieron cargar los países', 'error');
            return;
        }

        const countries = countriesResponse.data;
        showEditCityForm(city, countries);

    } catch (error) {
        console.error('Error al cargar ciudad:', error);
        showToast(`❌ Error: ${error.message}`, 'error');
    }
}

async function deleteCity(id, name) {
    // Confirmación antes de eliminar
    const confirmed = confirm(`¿Estás seguro de eliminar la ciudad "${name}"?\n\nEsta acción no se puede deshacer.`);
    
    if (!confirmed) {
        return;
    }

    try {
        showToast('⏳ Eliminando ciudad...', 'warning');

        const response = await window.fetchAPI(`/cities/${id}`, {
            method: 'DELETE'
        });

        if (response.success) {
            showToast(`✅ Ciudad "${name}" eliminada exitosamente`, 'success');
            loadCities(); // Recargar la lista
        } else {
            showToast('❌ Error al eliminar ciudad', 'error');
        }

    } catch (error) {
        console.error('Error al eliminar ciudad:', error);
        showToast(`❌ Error: ${error.message}`, 'error');
    }
}

/**
 * Mostrar formulario de edición con datos pre-llenados
 */
function showEditCityForm(city, countries) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>✏️ Editar Ciudad</h2>
        <form id="edit-city-form" onsubmit="handleEditCity(event, '${city.id}')">
            <div class="form-group">
                <label for="edit-city-countryId">País *</label>
                <select id="edit-city-countryId" name="countryId" required>
                    ${countries.map(country => `
                        <option value="${country. id}" ${country.id === city.countryId ? 'selected' : ''}>
                            ${country.flag || '🌍'} ${country.name}
                        </option>
                    `).join('')}
                </select>
            </div>

            <div class="form-group">
                <label for="edit-city-name">Nombre de la Ciudad *</label>
                <input type="text" id="edit-city-name" name="name" value="${city.name}" required>
            </div>

            <div class="form-group">
                <label for="edit-city-population">Población *</label>
                <input type="number" id="edit-city-population" name="population" value="${city. population}" required min="1">
            </div>

            <div class="form-group">
                <label for="edit-city-isCapital">¿Es capital?</label>
                <select id="edit-city-isCapital" name="isCapital" required>
                    <option value="false" ${! city.isCapital ? 'selected' : ''}>No</option>
                    <option value="true" ${city.isCapital ? 'selected' : ''}>Sí</option>
                </select>
            </div>

            <div class="form-group">
                <label for="edit-city-latitude">Latitud (opcional)</label>
                <input type="number" id="edit-city-latitude" name="latitude" value="${city.latitude || ''}" step="0.0001">
            </div>

            <div class="form-group">
                <label for="edit-city-longitude">Longitud (opcional)</label>
                <input type="number" id="edit-city-longitude" name="longitude" value="${city.longitude || ''}" step="0.0001">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">💾 Guardar Cambios</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">❌ Cancelar</button>
            </div>
        </form>
    `;
    
    showModal();
}

/**
 * Manejar envío del formulario de edición
 */
async function handleEditCity(event, cityId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const cityData = {
        countryId: formData.get('countryId'),
        name: formData.get('name'),
        population: parseInt(formData.get('population')),
        isCapital: formData.get('isCapital') === 'true',
        latitude: formData.get('latitude') ? parseFloat(formData.get('latitude')) : undefined,
        longitude: formData.get('longitude') ? parseFloat(formData. get('longitude')) : undefined
    };

    try {
        // Deshabilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Guardando...';

        const response = await window.fetchAPI(`/cities/${cityId}`, {
            method: 'PUT',
            body: JSON.stringify(cityData)
        });

        if (response.success) {
            showToast('✅ Ciudad actualizada exitosamente', 'success');
            closeModal();
            loadCities(); // Recargar la lista
        } else {
            showToast('❌ Error al actualizar ciudad', 'error');
        }

    } catch (error) {
        console.error('Error al actualizar ciudad:', error);
        showToast(`❌ Error: ${error.message}`, 'error');
        
        // Re-habilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = '💾 Guardar Cambios';
    }
}

// Exponer funciones globalmente
window.loadCities = loadCities;
window.editCity = editCity;
window.deleteCity = deleteCity;
window.showEditCityForm = showEditCityForm;
window.handleEditCity = handleEditCity;