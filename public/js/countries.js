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
async function editCountry(id) {
    try {
        // Obtener datos actuales del país
        showToast('⏳ Cargando datos del país...', 'success');
        
        const response = await window.fetchAPI(`/countries/${id}?database=postgresql`);
        
        if (! response.success || !response.data) {
            showToast('❌ No se pudo cargar el país', 'error');
            return;
        }

        const country = response.data;
        showEditCountryForm(country);

    } catch (error) {
        console.error('Error al cargar país:', error);
        showToast(`❌ Error: ${error.message}`, 'error');
    }
}

async function deleteCountry(id, name) {
    // Confirmación antes de eliminar
    const confirmed = confirm(`¿Estás seguro de eliminar el país "${name}"?\n\nEsta acción no se puede deshacer.`);
    
    if (!confirmed) {
        return;
    }

    try {
        showToast('⏳ Eliminando país...', 'warning');

        const response = await window.fetchAPI(`/countries/${id}? database=postgresql`, {
            method: 'DELETE'
        });

        if (response.success) {
            showToast(`✅ País "${name}" eliminado exitosamente`, 'success');
            loadCountries(); // Recargar la lista
        } else {
            showToast('❌ Error al eliminar país', 'error');
        }

    } catch (error) {
        console. error('Error al eliminar país:', error);
        showToast(`❌ Error: ${error. message}`, 'error');
    }
}

/**
 * Mostrar formulario de edición con datos pre-llenados
 */
function showEditCountryForm(country) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody. innerHTML = `
        <h2>✏️ Editar País</h2>
        <form id="edit-country-form" onsubmit="handleEditCountry(event, '${country.id}')">
            <div class="form-group">
                <label for="edit-name">Nombre del País *</label>
                <input type="text" id="edit-name" name="name" value="${country.name}" required>
            </div>

            <div class="form-group">
                <label for="edit-continent">Continente *</label>
                <select id="edit-continent" name="continent" required>
                    <option value="África" ${country.continent === 'África' ? 'selected' : ''}>África</option>
                    <option value="América" ${country.continent === 'América' ?  'selected' : ''}>América</option>
                    <option value="Asia" ${country.continent === 'Asia' ? 'selected' : ''}>Asia</option>
                    <option value="Europa" ${country.continent === 'Europa' ? 'selected' : ''}>Europa</option>
                    <option value="Oceanía" ${country.continent === 'Oceanía' ? 'selected' : ''}>Oceanía</option>
                </select>
            </div>

            <div class="form-group">
                <label for="edit-capital">Capital *</label>
                <input type="text" id="edit-capital" name="capital" value="${country.capital}" required>
            </div>

            <div class="form-group">
                <label for="edit-population">Población *</label>
                <input type="number" id="edit-population" name="population" value="${country.population}" required min="1">
            </div>

            <div class="form-group">
                <label for="edit-language">Idioma *</label>
                <input type="text" id="edit-language" name="language" value="${country.language}" required>
            </div>

            <div class="form-group">
                <label for="edit-flag">Bandera (emoji)</label>
                <input type="text" id="edit-flag" name="flag" value="${country.flag || ''}" maxlength="2">
            </div>

            <div class="form-group">
                <label for="edit-area">Área (km²)</label>
                <input type="number" id="edit-area" name="area" value="${country.area || ''}" min="1">
            </div>

            <div class="form-group">
                <label for="edit-currency">Moneda</label>
                <input type="text" id="edit-currency" name="currency" value="${country.currency || ''}">
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
async function handleEditCountry(event, countryId) {
    event. preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const countryData = {
        name: formData.get('name'),
        continent: formData.get('continent'),
        capital: formData. get('capital'),
        population: parseInt(formData.get('population')),
        language: formData. get('language'),
        flag: formData.get('flag') || undefined,
        area: formData. get('area') ? parseInt(formData.get('area')) : undefined,
        currency: formData. get('currency') || undefined
    };

    try {
        // Deshabilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Guardando... ';

        const response = await window.fetchAPI(`/countries/${countryId}? database=postgresql`, {
            method: 'PUT',
            body: JSON.stringify(countryData)
        });

        if (response.success) {
            showToast('✅ País actualizado exitosamente', 'success');
            closeModal();
            loadCountries(); // Recargar la lista
        } else {
            showToast('❌ Error al actualizar país', 'error');
        }

    } catch (error) {
        console.error('Error al actualizar país:', error);
        showToast(`❌ Error: ${error.message}`, 'error');
        
        // Re-habilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = '💾 Guardar Cambios';
    }
}

// Exponer funciones globalmente
window.loadCountries = loadCountries;
window.editCountry = editCountry;
window.deleteCountry = deleteCountry;
window.showEditCountryForm = showEditCountryForm;
window.handleEditCountry = handleEditCountry;