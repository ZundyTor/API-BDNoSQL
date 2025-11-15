class Country {

  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name;
    this.continent = data.continent;
    this.capital = data.capital;
    this.population = data.population;
    this.language = data.language;
    this.flag = data.flag;
    this.area = data.area;
    this.currency = data.currency;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();

    // Validamos que los datos sean correctos
    this.validate();
  }

  /**
   * Genera un ID único para el país
   * @returns {string} ID generado
   */
  generateId() {
    return `country_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Valida que todos los campos requeridos estén presentes y sean correctos
   * @throws {Error} Si algún campo no es válido
   */
  validate() {
    // Validar nombre
    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      throw new Error('El nombre del país es requerido y debe ser un texto válido');
    }

    // Validar continente
    const validContinents = ['África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida'];
    if (!this.continent || !validContinents.includes(this.continent)) {
      throw new Error(`El continente debe ser uno de: ${validContinents.join(', ')}`);
    }

    // Validar capital
    if (!this.capital || typeof this.capital !== 'string' || this.capital.trim().length === 0) {
      throw new Error('La capital es requerida y debe ser un texto válido');
    }

    // Validar población
    if (!this.population || typeof this.population !== 'number' || this.population < 0) {
      throw new Error('La población debe ser un número positivo');
    }

    // Validar idioma
    if (!this.language || typeof this.language !== 'string' || this.language.trim().length === 0) {
      throw new Error('El idioma es requerido y debe ser un texto válido');
    }

    // Validar área
    if (this.area && (typeof this.area !== 'number' || this.area < 0)) {
      throw new Error('El área debe ser un número positivo');
    }
  }

  /**
   * Actualiza las propiedades del país
   * @param {Object} data - Datos a actualizar
   */
  update(data) {
    if (data.name) this.name = data.name;
    if (data.continent) this.continent = data.continent;
    if (data.capital) this.capital = data.capital;
    if (data.population) this.population = data.population;
    if (data.language) this.language = data.language;
    if (data.flag) this.flag = data.flag;
    if (data.area) this.area = data.area;
    if (data.currency) this.currency = data.currency;
    
    this.updatedAt = new Date();
    
    // Validamos después de actualizar
    this.validate();
  }

  /**
   * Convierte la entidad a un objeto plano (para guardar en BD)
   * @returns {Object} Objeto con todas las propiedades
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      continent: this.continent,
      capital: this.capital,
      population: this.population,
      language: this.language,
      flag: this.flag,
      area: this.area,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Devuelve una representación en texto del país
   * @returns {string} Descripción del país
   */
  toString() {
    return `${this.flag} ${this.name} - ${this.continent} | Población: ${this.population.toLocaleString()} | Capital: ${this.capital}`;
  }

  /**
   * Calcula la densidad poblacional (habitantes por km²)
   * @returns {number} Densidad poblacional
   */
  getPopulationDensity() {
    if (!this.area || this.area === 0) {
      return 0;
    }
    return Math.round(this.population / this.area);
  }
}

// Exportamos la clase para usarla en otros archivos
module.exports = Country;