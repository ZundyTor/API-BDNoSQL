/**
 * Repository para la entidad Country en PostgreSQL
 * 
 * Este repositorio implementa el patrón Repository para separar
 * la lógica de acceso a datos de la lógica de negocio.
 */

const Country = require('../../domain/entities/Country');
const postgresConnection = require('../database/postgresql/connection');

class CountryPostgreSQLRepository {
  
  /**
   * Crea un nuevo país en la base de datos
   * @param {Country} country - Entidad Country a guardar
   * @returns {Promise<Country>} País guardado
   */
  async create(country) {
    try {
      // Validamos que sea una instancia de Country
      if (!(country instanceof Country)) {
        throw new Error('El parámetro debe ser una instancia de Country');
      }

      const query = `
        INSERT INTO countries (
          id, name, continent, capital, population, 
          language, flag, area, currency, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;

      const values = [
        country.id,
        country.name,
        country.continent,
        country.capital,
        country.population,
        country.language,
        country.flag,
        country.area,
        country.currency,
        country.createdAt,
        country.updatedAt
      ];

      const result = await postgresConnection.query(query, values);
      
      console.log(`✅ País "${country.name}" creado en PostgreSQL`);
      
      // Convertimos el resultado de vuelta a una entidad Country
      return this._mapToEntity(result.rows[0]);
      
    } catch (error) {
      console.error('❌ Error al crear país en PostgreSQL:', error.message);
      throw error;
    }
  }

  /**
   * Busca un país por su ID
   * @param {string} id - ID del país
   * @returns {Promise<Country|null>} País encontrado o null
   */
  async findById(id) {
    try {
      const query = 'SELECT * FROM countries WHERE id = $1';
      const result = await postgresConnection.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return this._mapToEntity(result.rows[0]);
      
    } catch (error) {
      console.error('❌ Error al buscar país por ID:', error.message);
      throw error;
    }
  }

  /**
   * Busca un país por su nombre
   * @param {string} name - Nombre del país
   * @returns {Promise<Country|null>} País encontrado o null
   */
  async findByName(name) {
    try {
      const query = 'SELECT * FROM countries WHERE LOWER(name) = LOWER($1)';
      const result = await postgresConnection.query(query, [name]);

      if (result.rows.length === 0) {
        return null;
      }

      return this._mapToEntity(result.rows[0]);
      
    } catch (error) {
      console.error('❌ Error al buscar país por nombre:', error.message);
      throw error;
    }
  }

  /**
   * Obtiene todos los países
   * @param {Object} options - Opciones de paginación
   * @param {number} options.limit - Límite de resultados
   * @param {number} options.offset - Desplazamiento
   * @returns {Promise<Country[]>} Lista de países
   */
  async findAll(options = {}) {
    try {
      const limit = options.limit || 100;
      const offset = options.offset || 0;

      const query = `
        SELECT * FROM countries 
        ORDER BY name ASC
        LIMIT $1 OFFSET $2
      `;

      const result = await postgresConnection.query(query, [limit, offset]);

      return result.rows.map(row => this._mapToEntity(row));
      
    } catch (error) {
      console.error('❌ Error al obtener todos los países:', error.message);
      throw error;
    }
  }

  /**
   * Busca países por continente
   * @param {string} continent - Nombre del continente
   * @returns {Promise<Country[]>} Lista de países del continente
   */
  async findByContinent(continent) {
    try {
      const query = `
        SELECT * FROM countries 
        WHERE continent = $1
        ORDER BY name ASC
      `;

      const result = await postgresConnection.query(query, [continent]);

      return result.rows.map(row => this._mapToEntity(row));
      
    } catch (error) {
      console.error('❌ Error al buscar países por continente:', error.message);
      throw error;
    }
  }

  /**
   * Busca países con población mayor a un valor dado
   * @param {number} minPopulation - Población mínima
   * @returns {Promise<Country[]>} Lista de países
   */
  async findByMinPopulation(minPopulation) {
    try {
      const query = `
        SELECT * FROM countries 
        WHERE population >= $1
        ORDER BY population DESC
      `;

      const result = await postgresConnection.query(query, [minPopulation]);

      return result.rows.map(row => this._mapToEntity(row));
      
    } catch (error) {
      console.error('❌ Error al buscar países por población:', error.message);
      throw error;
    }
  }

  /**
   * Actualiza un país existente
   * @param {string} id - ID del país a actualizar
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Country|null>} País actualizado o null si no existe
   */
  async update(id, data) {
    try {
      // Primero buscamos si existe el país
      const existingCountry = await this.findById(id);
      
      if (!existingCountry) {
        return null;
      }

      // Actualizamos la entidad con los nuevos datos
      existingCountry.update(data);

      const query = `
        UPDATE countries 
        SET name = $1, continent = $2, capital = $3, population = $4,
            language = $5, flag = $6, area = $7, currency = $8, 
            updated_at = $9
        WHERE id = $10
        RETURNING *
      `;

      const values = [
        existingCountry.name,
        existingCountry.continent,
        existingCountry.capital,
        existingCountry.population,
        existingCountry.language,
        existingCountry.flag,
        existingCountry.area,
        existingCountry.currency,
        existingCountry.updatedAt,
        id
      ];

      const result = await postgresConnection.query(query, values);
      
      console.log(`✅ País "${existingCountry.name}" actualizado en PostgreSQL`);
      
      return this._mapToEntity(result.rows[0]);
      
    } catch (error) {
      console.error('❌ Error al actualizar país:', error.message);
      throw error;
    }
  }

  /**
   * Elimina un país por su ID
   * @param {string} id - ID del país a eliminar
   * @returns {Promise<boolean>} True si se eliminó, false si no existía
   */
  async delete(id) {
    try {
      const query = 'DELETE FROM countries WHERE id = $1 RETURNING *';
      const result = await postgresConnection.query(query, [id]);

      if (result.rows.length === 0) {
        return false;
      }

      console.log(`✅ País con ID "${id}" eliminado de PostgreSQL`);
      return true;
      
    } catch (error) {
      console.error('❌ Error al eliminar país:', error.message);
      throw error;
    }
  }

  /**
   * Cuenta el total de países en la base de datos
   * @returns {Promise<number>} Número total de países
   */
  async count() {
    try {
      const query = 'SELECT COUNT(*) as total FROM countries';
      const result = await postgresConnection.query(query);

      return parseInt(result.rows[0].total);
      
    } catch (error) {
      console.error('❌ Error al contar países:', error.message);
      throw error;
    }
  }

  /**
   * Elimina todos los países (útil para testing)
   * @returns {Promise<number>} Número de países eliminados
   */
  async deleteAll() {
    try {
      const query = 'DELETE FROM countries RETURNING *';
      const result = await postgresConnection.query(query);

      console.log(`✅ ${result.rowCount} países eliminados de PostgreSQL`);
      return result.rowCount;
      
    } catch (error) {
      console.error('❌ Error al eliminar todos los países:', error.message);
      throw error;
    }
  }

  /**
   * Convierte un registro de BD a una entidad Country
   * @private
   * @param {Object} row - Fila de la base de datos
   * @returns {Country} Entidad Country
   */
  _mapToEntity(row) {
    return new Country({
      id: row.id,
      name: row.name,
      continent: row.continent,
      capital: row.capital,
      population: parseInt(row.population),
      language: row.language,
      flag: row.flag,
      area: parseFloat(row.area),
      currency: row.currency,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
}

module.exports = CountryPostgreSQLRepository;