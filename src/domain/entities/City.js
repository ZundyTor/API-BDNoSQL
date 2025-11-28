/**
 * Entidad: City (Ciudad)
 * Representa una ciudad con sus atributos y reglas de negocio
 */

class City {
  constructor({
    id = null,
    countryId,
    name,
    population,
    isCapital = false,
    latitude = null,
    longitude = null,
    createdAt = null,
    updatedAt = null
  }) {
    // Validaciones
    this.validateRequiredFields({ countryId, name, population });
    this.validatePopulation(population);
    this.validateName(name);
    this.validateCoordinates(latitude, longitude);

    // Asignación de propiedades
    this.id = id || this.generateId();
    this. countryId = countryId;
    this.name = name. trim();
    this.population = parseInt(population);
    this.isCapital = Boolean(isCapital);
    this.latitude = latitude ?  parseFloat(latitude) : null;
    this.longitude = longitude ?  parseFloat(longitude) : null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  /**
   * Validar campos requeridos
   */
  validateRequiredFields({ countryId, name, population }) {
    if (!countryId || countryId. toString().trim() === '') {
      throw new Error('El ID del país es obligatorio');
    }

    if (!name || name.trim() === '') {
      throw new Error('El nombre de la ciudad es obligatorio');
    }

    if (population === null || population === undefined) {
      throw new Error('La población es obligatoria');
    }
  }

  /**
   * Validar nombre
   */
  validateName(name) {
    if (name. trim(). length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    if (name.length > 255) {
      throw new Error('El nombre no puede exceder 255 caracteres');
    }
  }

  /**
   * Validar población
   */
  validatePopulation(population) {
    const pop = parseInt(population);

    if (isNaN(pop)) {
      throw new Error('La población debe ser un número');
    }

    if (pop < 0) {
      throw new Error('La población no puede ser negativa');
    }

    if (pop > 2000000000) {
      throw new Error('La población excede el límite razonable (2 billones)');
    }
  }

  /**
   * Validar coordenadas geográficas
   */
  validateCoordinates(latitude, longitude) {
    if (latitude !== null && latitude !== undefined) {
      const lat = parseFloat(latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('La latitud debe estar entre -90 y 90 grados');
      }
    }

    if (longitude !== null && longitude !== undefined) {
      const lng = parseFloat(longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('La longitud debe estar entre -180 y 180 grados');
      }
    }
  }

  /**
   * Generar ID único para la ciudad
   */
  generateId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `city_${timestamp}_${random}`;
  }

  /**
   * Convertir a objeto plano (para base de datos)
   */
  toJSON() {
    return {
      id: this.id,
      countryId: this.countryId,
      name: this. name,
      population: this. population,
      isCapital: this.isCapital,
      latitude: this.latitude,
      longitude: this.longitude,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Actualizar datos de la ciudad
   */
  update(data) {
    if (data.name !== undefined) {
      this.validateName(data.name);
      this.name = data.name. trim();
    }

    if (data.population !== undefined) {
      this.validatePopulation(data.population);
      this. population = parseInt(data.population);
    }

    if (data.isCapital !== undefined) {
      this.isCapital = Boolean(data.isCapital);
    }

    if (data.latitude !== undefined) {
      this.validateCoordinates(data.latitude, this.longitude);
      this.latitude = data.latitude ?  parseFloat(data.latitude) : null;
    }

    if (data.longitude !== undefined) {
      this.validateCoordinates(this.latitude, data.longitude);
      this.longitude = data.longitude ? parseFloat(data. longitude) : null;
    }

    // countryId no debe actualizarse una vez creado
    // Si se necesita cambiar, es mejor eliminar y crear nuevo

    this.updatedAt = new Date();
  }

  /**
   * Método de utilidad: Verificar si tiene coordenadas
   */
  hasCoordinates() {
    return this.latitude !== null && this. longitude !== null;
  }

  /**
   * Método de utilidad: Obtener información resumida
   */
  getSummary() {
    return {
      id: this.id,
      name: this.name,
      population: this.population,
      isCapital: this.isCapital
    };
  }
}

module.exports = City;